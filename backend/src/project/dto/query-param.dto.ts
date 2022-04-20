import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsBooleanString,
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  priority,
  priorityTypes,
  sortBy,
  sortByTypes,
  status,
  statusTypes,
} from '../types';

export class QueryParamDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsIn(sortByTypes)
  srt?: sortBy;

  @IsOptional()
  @IsBooleanString()
  favorite?: string;

  @IsOptional()
  @IsIn(statusTypes)
  status?: status;

  @IsOptional()
  @IsIn(priorityTypes)
  priority?: priority;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDateString()
  deadlineFrom?: string;

  @IsOptional()
  @IsDateString()
  deadlineTo?: string;

  @IsOptional()
  @IsDateString()
  createdFrom?: string;

  @IsOptional()
  @IsDateString()
  createdTo?: string;

  @IsOptional()
  @IsDateString()
  updatedFrom?: string;

  @IsOptional()
  @IsDateString()
  updatedTo?: string;
}
