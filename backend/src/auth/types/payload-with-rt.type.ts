import { Payload } from './payload.type';

export interface PayloadWithRt extends Payload {
  refreshToken: string;
}
