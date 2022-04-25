import { IsString } from 'class-validator';

export class ChangeUsernameDto {
  @IsString()
  username: string;
}
