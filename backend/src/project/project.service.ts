import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async createProject(userId: number, dto: CreateProjectDto) {
    const project = await this.prisma.project.create({
      data: {
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
}
