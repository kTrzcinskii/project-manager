import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signupLocal(dto: SignUpDto): Promise<Tokens> {
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        hash: await argon2.hash(dto.password),
      },
    });
  }

  signinLocal() {}

  logout() {}

  refreshTokens() {}
}
