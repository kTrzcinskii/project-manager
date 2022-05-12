import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangeGoalContentDto, CreateGoalDto } from './dto';
import { status } from '../project/types';

@Injectable()
export class GoalService {
  constructor(private prisma: PrismaService) {}

  async addNewGoal(userId: number, projectId: number, dto: CreateGoalDto) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { goals: true },
    });

    if (!project || project.userId !== userId) {
      throw new NotFoundException(
        'Project that you are trying to add goal to does not exist',
      );
    }

    let progressBar = project.progressBar;

    if (project.progressBar !== 0) {
      const allGoals = project.goals;
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
        completedAt: null,
      },
      include: { goals: true },
    });

    if (!updatedProject) {
      throw new InternalServerErrorException(
        'There is a problem with the server, try again later',
      );
    }

    return updatedProject;
  }

  async deleteGoal(userId: number, goalId: number) {
    const project = await this.prisma.project.findFirst({
      where: { goals: { some: { id: goalId } } },
      include: { goals: true },
    });

    if (!project) {
      throw new NotFoundException('Goal with provided id does not exist');
    }

    const goal = project.goals.find((goal) => goal.id === goalId);

    if (!goal || project.userId !== userId) {
      throw new NotFoundException(
        'The goal you are trying to delete does not exist',
      );
    }

    const goalsNumber = project.goals.length;
    if (goalsNumber <= 1) {
      throw new BadRequestException(
        'Your project must containt at least one goal',
      );
    }

    let progressBar = project.progressBar;

    const goalValue = goal.completed ? 1 : 0;

    const allGoals = project.goals;
    const completedGoals = allGoals.filter((goal) => goal.completed);
    progressBar = Math.round(
      ((completedGoals.length - goalValue) / (allGoals.length - 1)) * 100,
    );

    let completedAt: Date | null = null;
    let status: status = project.status;
    if (status !== 'finished' && progressBar === 100) {
      status = 'finished';
      completedAt = new Date();
    }

    await this.prisma.goal.delete({ where: { id: goalId } });
    const updatedProject = await this.prisma.project.update({
      where: { id: project.id },
      data: { status, progressBar, completedAt },
      include: { goals: true },
    });

    if (!updatedProject) {
      throw new InternalServerErrorException(
        'There is a problem with a server, try again later',
      );
    }

    return updatedProject;
  }

  async updateGoal(userId: number, goalId: number) {
    const project = await this.prisma.project.findFirst({
      where: { goals: { some: { id: goalId } } },
      include: { goals: true },
    });

    if (!project) {
      throw new NotFoundException('Goal with provided id does not exist');
    }

    const goal = project.goals.find((goal) => goal.id === goalId);

    if (!goal || project.userId !== userId) {
      throw new NotFoundException('Goal with provided id does not exist');
    }

    const allGoals = project.goals;
    const allGoalsNumber = allGoals.length;
    let completedGoalsNumber = allGoals.filter((goal) => goal.completed).length;

    let goalCompletedAt: Date | null = null;
    if (!goal.completed) {
      goalCompletedAt = new Date();
    }

    const updatedGoal = await this.prisma.goal.update({
      where: { id: goalId },
      data: { completed: !goal.completed, completedAt: goalCompletedAt },
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
    let completedAt: Date | null = null;
    if (project.status !== 'finished') {
      status = progressBar === 100 ? 'finished' : project.status;
      if (progressBar === 100) {
        completedAt = new Date();
      }
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
        completedAt,
      },
      select: { progressBar: true, status: true },
    });

    return {
      status: updatedProject.status,
      progressBar: updatedProject.progressBar,
    };
  }

  async changeGoalContent(
    userId: number,
    goalId: number,
    dto: ChangeGoalContentDto,
  ) {
    const project = await this.prisma.project.findFirst({
      where: { goals: { some: { id: goalId } } },
      include: { goals: true },
    });

    if (!project || project.userId !== userId) {
      throw new NotFoundException(
        'The goal you are trying to edit does not exist',
      );
    }

    const goal = project.goals.find((goal) => goal.id === goalId);

    if (!goal) {
      throw new NotFoundException(
        'The goal you are trying to edit does not exist',
      );
    }

    const updatedGoal = await this.prisma.goal.update({
      where: { id: goalId },
      data: { content: dto.content },
    });

    return updatedGoal;
  }
}
