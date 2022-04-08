import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
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
}
