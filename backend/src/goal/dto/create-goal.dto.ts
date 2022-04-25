import { IsString } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  content: string;
}
