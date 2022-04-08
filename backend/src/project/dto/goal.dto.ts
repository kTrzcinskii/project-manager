import { IsNotEmpty, IsString } from 'class-validator';

export class GoalDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
