import { IsString } from 'class-validator';

export class ChangeGoalContentDto {
  @IsString()
  content: string;
}
