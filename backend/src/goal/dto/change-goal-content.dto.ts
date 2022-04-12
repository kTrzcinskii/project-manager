import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeGoalContentDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
