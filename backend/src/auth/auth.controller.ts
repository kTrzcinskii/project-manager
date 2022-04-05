import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { GetCurrentUser, RtCookie } from 'src/common/decorators';
import { AtGuard, RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { Payload, PayloadWithRt, Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() dto: SignUpDto, @Res() response: Response) {
    const tokens = await this.authService.signupLocal(dto);
    this.asignCookies(response, tokens);
    return response.json({ successful: true });
  }

  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Body() dto: SignInDto, @Res() response: Response) {
    const tokens = await this.authService.signinLocal(dto);
    this.asignCookies(response, tokens);
    return response.json({ successful: true });
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUser() user: Payload, @Res() response: Response) {
    await this.authService.logout(user.sub);
    this.deteleCookies(response);
    return response.json({ successful: true });
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUser() user: Payload,
    @Res() response: Response,
    @RtCookie() rtCookie: string,
  ) {
    const tokens = await this.authService.refreshTokens(user.sub, rtCookie);
    this.asignCookies(response, tokens);
    return response.json({ successful: true });
  }

  asignCookies(response: Response, tokens: Tokens) {
    response.cookie('at', tokens.access_token, {
      expires: new Date(new Date().getTime() + 60 * 1000 * 30), // 30 min
      sameSite: 'lax',
      httpOnly: true,
    });

    response.cookie('rt', tokens.refresh_token, {
      expires: new Date(new Date().getTime() + 60 * 1000 * 60 * 24 * 7), // 7 days
      sameSite: 'lax',
      httpOnly: true,
    });
  }

  deteleCookies(response: Response) {
    response.cookie('at', 'DELETED', {
      expires: new Date(), // expires in the moment of creation
      sameSite: 'lax',
      httpOnly: true,
    });

    response.cookie('rt', 'DELETED', {
      expires: new Date(), // expires in the moment of creation
      sameSite: 'lax',
      httpOnly: true,
    });
  }
}
