import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Payload } from 'src/auth/types';
import { GetCurrentUser } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { CreateProjectDto, EditProjectDto, QueryParamDto } from './dto';
import { ProjectService } from './project.service';

@UseGuards(AtGuard)
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get(':id')
  getSingleProject(
    @GetCurrentUser() user: Payload,
    @Param('id', ParseIntPipe) projectId: number,
  ) {
    return this.projectService.getSingleProject(user.sub, projectId);
  }

  @Get('')
  getAllProjects(
    @GetCurrentUser() user: Payload,
    @Query() query: QueryParamDto,
  ) {
    return this.projectService.getAllProjects(user.sub, query);
  }

  @Post('create')
  createProject(
    @GetCurrentUser() user: Payload,
    @Body() dto: CreateProjectDto,
  ) {
    return this.projectService.createProject(user.sub, dto);
  }

  @Patch('edit/:id')
  editProject(
    @GetCurrentUser() user: Payload,
    @Param('id', ParseIntPipe) projectId: number,
    @Body() dto: EditProjectDto,
  ) {
    return this.projectService.editProjet(user.sub, projectId, dto);
  }

  @Delete('delete/:id')
  deleteProject(
    @GetCurrentUser() user: Payload,
    @Param('id', ParseIntPipe) projectId: number,
  ) {
    return this.projectService.deleteProject(user.sub, projectId);
  }
}
