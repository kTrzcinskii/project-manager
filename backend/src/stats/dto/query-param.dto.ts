import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsNumber, IsOptional } from 'class-validator';
import { from, fromTypes } from '../types';

export class QueryParamDto {
  @IsOptional()
  @IsIn(fromTypes)
  from?: from;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  customFrom?: number;

  @IsOptional()
  @IsDateString()
  date?: string;
}
