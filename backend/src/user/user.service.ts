import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
