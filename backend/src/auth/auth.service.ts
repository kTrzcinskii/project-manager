import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signupLocal(dto: SignUpDto): Promise<Tokens> {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          hash: await argon2.hash(dto.password),
        },
      });

      const tokens = await this.getTokens(
        newUser.id,
        newUser.username,
        newUser.email,
      );
      await this.updateRtHash(newUser.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('Provided email is already in use');
      }
      throw error;
    }
  }

  async signinLocal(dto: SignInDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Provided credentials are incorrect');
    }

    const passwordMatches = await argon2.verify(user.hash, dto.password);

    if (!passwordMatches) {
      throw new ForbiddenException('Provided credentials are incorrect');
    }

    const tokens = await this.getTokens(user.id, user.username, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: null,
      },
    });
  }

  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ForbiddenException('Provided credentials are incorrect');
    }

    if (!user.hashedRt) {
      throw new ForbiddenException('Your refresh token has expired');
    }

    const rtMatches = argon2.verify(user.hashedRt, rt);

    if (!rtMatches) {
      throw new ForbiddenException('Your refresh token is incorrect');
    }

    const tokens = await this.getTokens(user.id, user.username, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(userId: number, rt: string) {
    const hashedRt = await argon2.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt,
      },
    });
  }

  //utils
  async getTokens(
    userId: number,
    username: string,
    email: string,
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      // !access token
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          email,
        },
        {
          expiresIn: 60 * 30, // 30 minutes
          secret: this.config.get('AT_SECRET'),
        },
      ),
      // !refresh token
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          email,
        },
        {
          expiresIn: 60 * 60 * 24 * 7, // 1 week
          secret: this.config.get('RT_SECRET'),
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
