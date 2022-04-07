import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CookiesModule } from 'src/cookies/cookies.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [JwtModule.register({}), CookiesModule],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, ConfigService],
})
export class AuthModule {}
