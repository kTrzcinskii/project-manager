import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Tokens } from 'src/auth/types';

@Injectable()
export class CookiesService {
  constructor(private config: ConfigService) {}

  asignCookies(response: Response, tokens: Tokens) {
    response.cookie('at', tokens.access_token, {
      expires: new Date(new Date().getTime() + 60 * 1000 * 30), // 30 min
      sameSite: 'lax',
      secure: true,
      httpOnly: true,
      domain: this.config.get('FRONTEND_ORIGIN'),
    });

    response.cookie('rt', tokens.refresh_token, {
      expires: new Date(new Date().getTime() + 60 * 1000 * 60 * 24 * 7), // 7 days
      sameSite: 'lax',
      secure: true,
      httpOnly: true,
      domain: this.config.get('FRONTEND_ORIGIN'),
    });
  }

  deteleCookies(response: Response) {
    response.cookie('at', 'DELETED', {
      expires: new Date(), // expires in the moment of creation
      sameSite: 'lax',
      secure: true,
      httpOnly: true,
      domain: this.config.get('FRONTEND_ORIGIN'),
    });

    response.cookie('rt', 'DELETED', {
      expires: new Date(), // expires in the moment of creation
      sameSite: 'lax',
      secure: true,
      httpOnly: true,
      domain: this.config.get('FRONTEND_ORIGIN'),
    });
  }
}
