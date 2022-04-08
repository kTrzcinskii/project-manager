import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { priority, priorityTypes } from '../types';
import { GoalDto } from './goal.dto';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GoalDto)
  goals: GoalDto[];

  @IsDateString()
  @IsNotEmpty()
  deadline: string;

  @IsIn(priorityTypes)
  @IsNotEmpty()
  priority: priority;

  @IsOptional()
  @IsBoolean()
  favorite?: boolean;
}
