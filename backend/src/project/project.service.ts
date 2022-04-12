import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto';
import { status } from './types';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

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
        prority: dto.priority,
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
    });

    if (!project) {
      throw new InternalServerErrorException(
        "We couldn't add your project to the database, try again later",
      );
    }

    const projectGoals = await this.prisma.goal.findMany({
      where: { projectId: project.id },
    });

    return { ...project, projectGoals };
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