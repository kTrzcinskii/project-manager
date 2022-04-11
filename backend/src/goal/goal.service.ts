import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGoalDto } from './dto';
import { status } from '../project/types';

@Injectable()
export class GoalService {
  constructor(private prisma: PrismaService) {}

  async addNewGoal(userId: number, projectId: number, dto: CreateGoalDto) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project || project.userId !== userId) {
      throw new NotFoundException(
        'Project that you are trying to add goal to does not exist',
      );
    }

    let progressBar = project.progressBar;

    if (project.progressBar !== 0) {
      const allGoals = await this.prisma.goal.findMany({
        where: { projectId: project.id },
      });
      const completedGoals = allGoals.filter((goal) => goal.completed);
      progressBar = Math.round(
        (completedGoals.length / (allGoals.length + 1)) * 100,
      );
    }

    let status: status = project.status;
    if (status === 'finished') {
      const currentDate = new Date().getTime();
      const deadline = new Date(project.deadline).getTime();
      status = currentDate > deadline ? 'backlog' : 'inProgress';
    }

    const updatedProject = await this.prisma.project.update({
      where: { id: projectId },
      data: {
        goals: { create: { content: dto.content } },
        progressBar,
        status,
      },
    });

    if (!updatedProject) {
      throw new InternalServerErrorException(
        'There is a problem with the server, try again later',
      );
    }

    const projectGoals = await this.prisma.goal.findMany({
      where: { projectId: updatedProject.id },
    });

    return { ...updatedProject, projectGoals };
  }

  async deleteGoal(userId: number, goalId: number) {
    const goal = await this.prisma.goal.findUnique({ where: { id: goalId } });
    const projectId = goal.projectId;
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    if (
      !goal ||
      !project ||
      project.userId !== userId ||
      goal.projectId !== projectId
    ) {
      throw new NotFoundException(
        'The goal you are trying to delete does not exist',
      );
    }

    const goalsNumber = await this.prisma.goal.findMany({
      where: { projectId: projectId },
    });
    if (goalsNumber.length <= 1) {
      throw new BadRequestException(
        'Your project must containt at least one goal',
      );
    }

    let progressBar = project.progressBar;

    const goalValue = goal.completed ? 1 : 0;

    const allGoals = await this.prisma.goal.findMany({
      where: { projectId: project.id },
    });
    const completedGoals = allGoals.filter((goal) => goal.completed);
    progressBar = Math.round(
      ((completedGoals.length - goalValue) / (allGoals.length - 1)) * 100,
    );

    let status: status = project.status;
    if (status !== 'finished' && progressBar === 100) {
      status = 'finished';
    }

    await this.prisma.goal.delete({ where: { id: goalId } });
    const updatedProject = await this.prisma.project.update({
      where: { id: projectId },
      data: { status, progressBar },
    });

    if (!updatedProject) {
      throw new InternalServerErrorException(
        'There is a problem with a server, try again later',
      );
    }

    const projectGoals = allGoals.filter((goal) => goal.id !== goalId);

    return { ...updatedProject, projectGoals };
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
}
