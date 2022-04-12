import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Payload } from 'src/auth/types';
import { GetCurrentUser } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { ChangeGoalContentDto, CreateGoalDto } from './dto';
import { GoalService } from './goal.service';

@UseGuards(AtGuard)
@Controller('goal')
export class GoalController {
  constructor(private goalService: GoalService) {}

  @Post(':id')
  addNewGoal(
    @GetCurrentUser() user: Payload,
    @Param('id', ParseIntPipe) projectId: number,
    @Body() dto: CreateGoalDto,
  ) {
    return this.goalService.addNewGoal(user.sub, projectId, dto);
  }

  @Delete(':id')
  deleteGoal(
    @GetCurrentUser() user: Payload,
    @Param('id', ParseIntPipe) goalId: number,
  ) {
    return this.goalService.deleteGoal(user.sub, goalId);
  }

  @Patch(':id')
  updateGoal(
    @GetCurrentUser() user: Payload,
    @Param('id', ParseIntPipe) goalId: number,
  ) {
    return this.goalService.updateGoal(user.sub, goalId);
  }

  @Patch(':id/change-content')
  changeGoalContent(
    @GetCurrentUser() user: Payload,
    @Param('id', ParseIntPipe) goalId: number,
    @Body() dto: ChangeGoalContentDto,
  ) {
    return this.goalService.changeGoalContent(user.sub, goalId, dto);
  }
}
