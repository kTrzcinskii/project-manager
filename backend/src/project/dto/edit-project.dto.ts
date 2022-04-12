import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';
import { priority, priorityTypes } from '../types';

export class EditProjectDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  @IsOptional()
  deadline: string;

  @IsIn(priorityTypes)
  @IsOptional()
  priority: priority;

  @IsBoolean()
  @IsOptional()
  favorite: boolean;
}
