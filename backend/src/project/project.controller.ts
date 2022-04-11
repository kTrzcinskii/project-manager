import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Payload } from 'src/auth/types';
import { GetCurrentUser } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { CreateGoalDto, CreateProjectDto } from './dto';
import { ProjectService } from './project.service';

@UseGuards(AtGuard)
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('create')
  createProject(
    @GetCurrentUser() user: Payload,
    @Body() dto: CreateProjectDto,
  ) {
    return this.projectService.createProject(user.sub, dto);
  }

  @Post(':id/create-goal')
  addNewGoal(
    @GetCurrentUser() user: Payload,
    @Param('id', ParseIntPipe) projectId: number,
    @Body() dto: CreateGoalDto,
  ) {
    return this.projectService.addNewGoal(user.sub, projectId, dto);
  }

  @Delete(':projectId/delete-goal/:goalId')
  deleteGoal(
    @GetCurrentUser() user: Payload,
    @Param('goalId', ParseIntPipe) goalId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.projectService.deleteGoal(user.sub, projectId, goalId);
  }

  @Patch('update-goal/:id')
  updateGoal(
    @GetCurrentUser() user: Payload,
    @Param('id', ParseIntPipe) goalId: number,
  ) {
    return this.projectService.updateGoal(user.sub, goalId);
  }

  @Delete('delete/:id')
  deleteProject(
    @GetCurrentUser() user: Payload,
    @Param('id', ParseIntPipe) projectId: number,
  ) {
    return this.projectService.deleteProject(user.sub, projectId);
  }
}
