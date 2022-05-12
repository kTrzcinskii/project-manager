import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryParamDto } from './dto';
import { from } from './types';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getMainStats(userId: number, query: QueryParamDto) {
    const from: from | number = query.from || query.customFrom || 'week';

    const { searchFrom, searchTo } = this.getDateRange(from);

    const createdProjectsNumber = (
      await this.prisma.project.findMany({
        where: {
          userId,
          createdAt: {
            gte: searchFrom,
            lte: searchTo,
          },
        },
      })
    ).length;

    const completedProjectsNumber = await this.prisma.project.findMany({
      where: {},
    });

    return { createdProjectsNumber };
  }

  getDateRange(from: from | number) {
    const searchTo = new Date();

    const ONE_DAY = 7 * 24 * 3600 * 1000;
    const ONE_MONTH = 30 * ONE_DAY;
    const ONE_YEAR = 365 * ONE_DAY;

    if (from === 'today') {
      return { searchFrom: searchTo, searchTo };
    }

    if (from === 'week') {
      const searchFrom = new Date(searchTo.getTime() - ONE_DAY);
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
}
