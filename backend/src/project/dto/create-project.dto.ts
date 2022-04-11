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
  ArrayMinSize,
} from 'class-validator';
import { priority, priorityTypes } from '../types';
import { CreateGoalDto } from '../../goal/dto';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateGoalDto)
  goals: CreateGoalDto[];

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
