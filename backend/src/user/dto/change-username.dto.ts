import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeUsernameDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
