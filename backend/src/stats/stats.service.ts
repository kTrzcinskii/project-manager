import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryParamDto } from './dto';
import { from } from './types';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getMainStats(userId: number, query: QueryParamDto) {
    const from: from | number = query.from || query.customFrom || 'week';

    let date = undefined;
    if (query.date) {
      date = new Date(query.date);
    }

    const { searchFrom, searchTo } = this.getDateRange(from);

    const searchObject = this.getSearchObject(searchFrom, searchTo, date);

    const allProjects = await this.prisma.project.findMany({
      where: { userId },
      select: {
        priority: true,
      },
    });
    const allProjectsNumber = this.getProjectsByPriority(allProjects);

    const allCreatedProjects = await this.prisma.project.findMany({
      where: {
        userId,
        createdAt: searchObject,
      },
      select: {
        priority: true,
      },
    });
    const createdProjectsNumber =
      this.getProjectsByPriority(allCreatedProjects);

    const completedProjects = await this.prisma.project.findMany({
      where: { userId, completedAt: searchObject },
      select: {
        priority: true,
      },
    });

    const completedProjectsNumber =
      this.getProjectsByPriority(completedProjects);

    const updatedProjects = await this.prisma.project.findMany({
      where: { userId, updatedAt: searchObject },
      select: {
        priority: true,
      },
    });
    const updatedProjectsNumber = this.getProjectsByPriority(updatedProjects);

    const userProjectsIds = await this.getUserProjectsIDs(userId);

    const allGoalsNumber = await this.prisma.goal.count({
      where: { projectId: { in: userProjectsIds } },
    });

    const createdGoalsNumber = await this.prisma.goal.count({
      where: {
        projectId: { in: userProjectsIds },
        createdAt: searchObject,
      },
    });

    const completedGoalsNumber = await this.prisma.goal.count({
      where: {
        projectId: { in: userProjectsIds },
        completedAt: searchObject,
      },
    });

    const updatedGoalsNumber = await this.prisma.goal.count({
      where: {
        projectId: { in: userProjectsIds },
        updatedAt: searchObject,
      },
    });

    return {
      allProjectsNumber,
      createdProjectsNumber,
      completedProjectsNumber,
      updatedProjectsNumber,
      allGoalsNumber,
      createdGoalsNumber,
      completedGoalsNumber,
      updatedGoalsNumber,
    };
  }

  async getProjectStats(
    userId: number,
    projectId: number,
    query: QueryParamDto,
  ) {
    const userProjectsIds = await this.getUserProjectsIDs(userId);
    if (!userProjectsIds.includes(projectId)) {
      throw new NotFoundException('There is no project with provided id.');
    }

    const from: from | number = query.from || query.customFrom || 'week';

    let date = undefined;
    if (query.date) {
      date = new Date(query.date);
    }

    const { searchFrom, searchTo } = this.getDateRange(from);

    const searchObject = this.getSearchObject(searchFrom, searchTo, date);

    const createdGoalsNumber = await this.prisma.goal.count({
      where: {
        projectId,
        createdAt: searchObject,
      },
    });

    const completedGoalsNumber = await this.prisma.goal.count({
      where: {
        projectId,
        completedAt: searchObject,
      },
    });

    const updatedGoalsNumber = await this.prisma.goal.count({
      where: {
        projectId,
        updatedAt: searchObject,
      },
    });

    return { createdGoalsNumber, completedGoalsNumber, updatedGoalsNumber };
  }

  getDateRange(from: from | number) {
    const searchTo = new Date();

    const ONE_DAY = 24 * 3600 * 1000;
    const ONE_WEEK = 7 * ONE_DAY;
    const ONE_MONTH = 30 * ONE_DAY;
    const ONE_YEAR = 365 * ONE_DAY;

    if (from === 'today') {
      const hours = searchTo.getUTCHours() * 60 * 60 * 1000;
      const minutes = searchTo.getMinutes() * 60 * 1000;
      const seconds = searchTo.getSeconds() * 1000;

      const searchFrom = new Date(
        searchTo.getTime() - hours - minutes - seconds,
      );
      return { searchFrom, searchTo };
    }

    if (from === 'week') {
      const searchFrom = new Date(searchTo.getTime() - ONE_WEEK);
      return { searchFrom, searchTo };
    }

    if (from === 'month') {
      const searchFrom = new Date(searchTo.getTime() - ONE_MONTH);
      return { searchFrom, searchTo };
    }

    if (from === 'year') {
      const searchFrom = new Date(searchTo.getTime() - ONE_YEAR);
      return { searchFrom, searchTo };
    }

    //if it gets to this point it means from is the number
    if (typeof from === 'number') {
      const hours = searchTo.getUTCHours() * 60 * 60 * 1000;
      const minutes = searchTo.getMinutes() * 60 * 1000;
      const seconds = searchTo.getSeconds() * 1000;
      const miliseconds = hours + minutes + seconds;

      const minus =
        from === 1 ? miliseconds : miliseconds + (from - 1) * ONE_DAY;

      const searchFrom = new Date(searchTo.getTime() - minus);
      return { searchFrom, searchTo };
    }
  }

  getSearchObject(
    searchFrom: Date,
    searchTo: Date,
    date: Date | undefined,
  ): { gte: Date; lte: Date } {
    if (!date) {
      return { gte: searchFrom, lte: searchTo };
    }
    return {
      gte: date,
      lte: new Date(date.getTime() + 24 * 3600 * 1000 - 1000),
    };
  }

  async getUserProjectsIDs(userId: number) {
    return (
      await this.prisma.user.findUnique({
        where: { id: userId },
        select: { projects: { select: { id: true } } },
      })
    ).projects.map((project) => project.id);
  }

  getProjectsByPriority(
    projects: {
      priority: 'low' | 'medium' | 'high';
    }[],
  ) {
    const lowPriority = projects.filter(
      (project) => project.priority === 'low',
    ).length;
    const mediumPriority = projects.filter(
      (project) => project.priority === 'medium',
    ).length;
    const highPriority = projects.filter(
      (project) => project.priority === 'high',
    ).length;
    const all = projects.length;

    return { lowPriority, mediumPriority, highPriority, all };
  }
}
