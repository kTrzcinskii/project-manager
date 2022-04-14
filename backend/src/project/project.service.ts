import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto, EditProjectDto, QueryParamDto } from './dto';
import { status } from './types';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async getSingleProject(userId: number, projectId: number) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: { goals: true },
    });

    if (!project || project.userId !== userId) {
      throw new NotFoundException('Project with provided id does not exist');
    }

    return project;
  }

  async getAllProjects(userId: number, query: QueryParamDto) {
    const numberOfProjects = Number(query.limit) || 6;
    const page = Number(query.page) || 0;
    const sortBy = query.srt && query.srt.split('_');

    let orderObj: any = {};
    if (sortBy && sortBy.length === 2) {
      orderObj[sortBy[0]] = sortBy[1];
    } else {
      orderObj['createdAt'] = 'desc';
    }

    const allProject = await this.prisma.project.findMany({
      where: { userId },
      select: {
        createdAt: true,
        deadline: true,
        title: true,
        favorite: true,
        id: true,
        priority: true,
        progressBar: true,
        status: true,
      },
      take: numberOfProjects + 1,
      skip: page * numberOfProjects,
      orderBy: orderObj,
    });

    let hasMore = false;
    const projects = allProject.slice(0, numberOfProjects);
    if (allProject.length === numberOfProjects + 1) {
      hasMore = true;
    }

    return { projects, hasMore };
  }

  async createProject(userId: number, dto: CreateProjectDto) {
    const currentDate = new Date().getTime();
    const deadlineDate = new Date(dto.deadline).getTime();

    const status: status =
      currentDate > deadlineDate ? 'backlog' : 'inProgress';

    const favorite = !!dto.favorite;

    const project = await this.prisma.project.create({
      data: {
        status,
        favorite,
        title: dto.title,
        description: dto.description,
        deadline: new Date(dto.deadline),
        priority: dto.priority,
        goals: {
          createMany: {
            data: [...dto.goals],
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        goals: true,
      },
    });

    if (!project) {
      throw new InternalServerErrorException(
        "We couldn't add your project to the database, try again later",
      );
    }

    return project;
  }

  async editProjet(userId: number, projectId: number, dto: EditProjectDto) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project || project.userId !== userId) {
      throw new NotFoundException(
        'Project you are trying to edit does not exist',
      );
    }

    const updatedProject = await this.prisma.project.update({
      where: { id: projectId },
      data: { ...dto },
      include: { goals: true },
    });

    if (!updatedProject) {
      throw new InternalServerErrorException(
        'There is a problem with the server, try again later',
      );
    }

    return updatedProject;
  }

  async deleteProject(userId: number, projectId: number) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project || project.userId !== userId) {
      throw new NotFoundException('There is no project with provided id');
    }

    await this.prisma.project.delete({ where: { id: projectId } });

    return { successful: true };
  }
}
