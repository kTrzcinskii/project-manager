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
import { CreateProjectDto } from './dto';
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
