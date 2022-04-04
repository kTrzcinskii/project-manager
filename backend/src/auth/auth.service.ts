import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      // !access token
      this.jwtService.signAsync(
        {
          sub: userId,
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

  async signupLocal(dto: SignUpDto): Promise<Tokens> {
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        hash: await argon2.hash(dto.password),
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);

    return tokens;
  }

  signinLocal() {}

  logout() {}

  refreshTokens() {}
}
