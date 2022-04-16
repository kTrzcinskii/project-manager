import {
  IsBooleanString,
  IsIn,
  IsNumberString,
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
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

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
}
