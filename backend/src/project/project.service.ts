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

  async updateGoal(userId: number, goalId: number) {
    const goal = await this.prisma.goal.findUnique({ where: { id: goalId } });

    if (!goal) {
      throw new NotFoundException('There is no goal with provided id');
    }

    const project = await this.prisma.project.findUnique({
      where: { id: goal.projectId },
    });

    if (!project) {
      throw new InternalServerErrorException(
        'There is a problem with a server, try again later',
      );
    }

    if (project.userId !== userId) {
      throw new NotFoundException('There is no goal with provided id');
    }

    const allGoals = await this.prisma.goal.findMany({
      where: { projectId: project.id },
    });
    const allGoalsNumber = allGoals.length;
    let completedGoalsNumber = allGoals.filter((goal) => goal.completed).length;

    const updatedGoal = await this.prisma.goal.update({
      where: { id: goalId },
      data: { completed: !goal.completed },
    });

    if (updatedGoal.completed) {
      completedGoalsNumber++;
    } else {
      completedGoalsNumber--;
    }

    const progressBar = Math.round(
      (completedGoalsNumber / allGoalsNumber) * 100,
    );

    let status: status;
    if (project.status !== 'finished') {
      status = progressBar === 100 ? 'finished' : project.status;
    } else {
      const currentDate = new Date().getTime();
      const deadline = new Date(project.deadline).getTime();
      status = currentDate > deadline ? 'backlog' : 'inProgress';
    }

    const updatedProject = await this.prisma.project.update({
      where: { id: project.id },
      data: {
        progressBar,
        status,
      },
    });

    return {
      status: updatedProject.status,
      progressBar: updatedProject.progressBar,
    };
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
