import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class DeleteAccountDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
