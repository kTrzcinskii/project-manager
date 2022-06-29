import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Tokens } from 'src/auth/types';

@Injectable()
export class CookiesService {
  asignCookies(response: Response, tokens: Tokens) {
    response.cookie('at', tokens.access_token, {
      expires: new Date(new Date().getTime() + 60 * 1000 * 30), // 30 min
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });

    response.cookie('rt', tokens.refresh_token, {
      expires: new Date(new Date().getTime() + 60 * 1000 * 60 * 24 * 7), // 7 days
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });
  }

  deteleCookies(response: Response) {
    response.cookie('at', 'DELETED', {
      expires: new Date(), // expires in the moment of creation
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });

    response.cookie('rt', 'DELETED', {
      expires: new Date(), // expires in the moment of creation
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });
  }
}
