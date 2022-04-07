import { Module } from '@nestjs/common';
import { CookiesModule } from 'src/cookies/cookies.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [CookiesModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
