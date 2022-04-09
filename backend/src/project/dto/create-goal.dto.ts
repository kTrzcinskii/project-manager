import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
