import { Injectable } from '@nestjs/common';
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

    const createdProjectsNumber = await this.prisma.project.count({
      where: {
        userId,
        createdAt: searchObject,
      },
    });

    const completedProjectsNumber = await this.prisma.project.count({
      where: { userId, completedAt: searchObject },
    });

    const updatedProjectsNumber = await this.prisma.project.count({
      where: { userId, updatedAt: searchObject },
    });

    const userProjectsIds = (
      await this.prisma.user.findUnique({
        where: { id: userId },
        select: { projects: { select: { id: true } } },
      })
    ).projects.map((project) => project.id);

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
      createdProjectsNumber,
      completedProjectsNumber,
      updatedProjectsNumber,
      createdGoalsNumber,
      completedGoalsNumber,
      updatedGoalsNumber,
    };
  }

  async getProjectStats(userId: number, projectId: number) {
    return 'blabla';
  }

  getDateRange(from: from | number) {
    const searchTo = new Date();

    const ONE_DAY = 24 * 3600 * 1000;
    const ONE_WEEK = 7 * ONE_DAY;
    const ONE_MONTH = 30 * ONE_DAY;
    const ONE_YEAR = 365 * ONE_DAY;

    if (from === 'today') {
      return { searchFrom: new Date(searchTo.toLocaleDateString()), searchTo };
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
      const searchFrom = new Date(searchTo.getTime() - from * ONE_DAY);
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
}
