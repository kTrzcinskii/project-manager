import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CookiesModule } from './cookies/cookies.module';
@Module({
  imports: [AuthModule, PrismaModule, UserModule, CookiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
