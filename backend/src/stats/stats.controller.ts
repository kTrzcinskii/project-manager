import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Payload } from 'src/auth/types';
import { GetCurrentUser } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { QueryParamDto } from './dto';
import { StatsService } from './stats.service';

@Controller('stats')
@UseGuards(AtGuard)
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get()
  getMainStats(@GetCurrentUser() user: Payload, @Query() query: QueryParamDto) {
    return this.statsService.getMainStats(user.sub, query);
  }

  @Get('/project/:id')
  getProjectStats(
    @GetCurrentUser() user: Payload,
    @Param('id', ParseIntPipe) projectId: number,
    @Query() query: QueryParamDto,
  ) {
    return this.statsService.getProjectStats(user.sub, projectId, query);
  }
}
