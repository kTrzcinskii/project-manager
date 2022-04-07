import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CookiesModule } from './cookies/cookies.module';
import { ProjectModule } from './project/project.module';
@Module({
  imports: [AuthModule, PrismaModule, UserModule, CookiesModule, ProjectModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
