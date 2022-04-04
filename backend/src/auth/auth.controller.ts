import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { AtGuard, RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { Payload, PayloadWithRt, Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUser() user: Payload): Promise<void> {
    return this.authService.logout(user.sub);
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@GetCurrentUser() user: PayloadWithRt): Promise<Tokens> {
    return this.authService.refreshTokens(user.sub, user.refreshToken);
  }
}
