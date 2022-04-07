import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async me(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new InternalServerErrorException(
        'There is a problem with your account, try again later',
      );
    }

    return user;
  }

  async changeUsername(userId: number, newUsername: string) {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: newUsername,
      },
    });

    if (!updatedUser) {
      throw new InternalServerErrorException(
        'There is a problem with the server, try again later',
      );
    }

    return updatedUser;
  }

  async changeEmail(userId: number, newEmail: string) {
    const alreadyInUse = await this.prisma.user.findUnique({
      where: { email: newEmail },
    });

    if (alreadyInUse) {
      throw new BadRequestException('Provided email is already in use');
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: newEmail,
      },
    });

    if (!updatedUser) {
      throw new InternalServerErrorException(
        'There is a problem with the server, try again later',
      );
    }

    return updatedUser;
  }

  async changePassword(userId: number, newPassword: string) {
    const hash = await argon2.hash(newPassword);
    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hash,
      },
    });

    if (!updatedUser) {
      throw new InternalServerErrorException(
        'There is a problem with the server, try again later',
      );
    }

    return updatedUser;
  }
}
