import { IsIn, IsNumberString, IsOptional } from 'class-validator';
import { sortBy, sortByTypes } from '../types';

export class QueryParamDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsIn(sortByTypes)
  @IsOptional()
  srt?: sortBy;
}
