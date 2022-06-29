import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { GetCurrentUser, RtCookie } from 'src/common/decorators';
import { AtGuard, RtGuard } from 'src/common/guards';
import { CookiesService } from 'src/cookies/cookies.service';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { Payload } from './types';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookiesService: CookiesService,
  ) {}

  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() dto: SignUpDto, @Res() response: Response) {
    const tokens = await this.authService.signupLocal(dto);
    // this.cookiesService.asignCookies(response, tokens);
    return response.json({ successful: true, tokens });
  }

  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Body() dto: SignInDto, @Res() response: Response) {
    const tokens = await this.authService.signinLocal(dto);
    // this.cookiesService.asignCookies(response, tokens);
    return response.json({ successful: true, tokens });
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUser() user: Payload, @Res() response: Response) {
    await this.authService.logout(user.sub);
    // this.cookiesService.deteleCookies(response);
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
    // this.cookiesService.asignCookies(response, tokens);
    return response.json({ successful: true, tokens });
  }
}
