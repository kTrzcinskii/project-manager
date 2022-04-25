import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { priority, priorityTypes } from '../types';
import { CreateGoalDto } from '../../goal/dto';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateGoalDto)
  goals: CreateGoalDto[];

  @IsDateString()
  deadline: string;

  @IsIn(priorityTypes)
  priority: priority;

  @IsOptional()
  @IsBoolean()
  favorite?: boolean;
}
