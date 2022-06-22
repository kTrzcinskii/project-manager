import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto, EditProjectDto, QueryParamDto } from './dto';
import { ProjectsWithTimeLeft, status } from './types';

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

    const currentDate = new Date().getTime();
    const deadlineDate = new Date(project.deadline).getTime();
    let updatedProject: any = undefined;
    if (project.status === 'inProgress' && currentDate > deadlineDate) {
      updatedProject = await this.prisma.project.update({
        where: { id: projectId },
        data: { status: 'backlog' },
        include: { goals: true },
      });

      if (!updatedProject) {
        throw new InternalServerErrorException(
          'There is a problem with the server, please try again later',
        );
      }
    }

    if (updatedProject) {
      return updatedProject;
    }

    return project;
  }

  async getAllProjects(userId: number, query: QueryParamDto) {
    const numberOfProjects = query.limit || 6;
    const page = query.page || 0;

    const orderObj = this.getOrder(query);

    const filterObj = this.getFilters(query);

    const allProject = await this.prisma.project.findMany({
      where: { userId, ...filterObj },
      select: {
        createdAt: true,
        updatedAt: true,
        deadline: true,
        title: true,
        favorite: true,
        id: true,
        priority: true,
        progressBar: true,
        status: true,
        completedAt: true,
      },
      take: numberOfProjects + 1,
      skip: page * numberOfProjects,
      orderBy: orderObj,
    });

    let hasMore = false;
    const projects: ProjectsWithTimeLeft[] = allProject.slice(
      0,
      numberOfProjects,
    );
    if (allProject.length === numberOfProjects + 1) {
      hasMore = true;
    }

    const currentDate = new Date().getTime();

    for (const project of projects) {
      const deadlineDate = new Date(project.deadline).getTime();
      if (project.status === 'inProgress' && currentDate > deadlineDate) {
        const updatedProject = await this.prisma.project.update({
          where: { id: project.id },
          data: { status: 'backlog' },
          select: {
            createdAt: true,
            updatedAt: true,
            deadline: true,
            title: true,
            favorite: true,
            id: true,
            priority: true,
            progressBar: true,
            status: true,
          },
        });
        if (!updatedProject) {
          throw new InternalServerErrorException(
            'There is a problem with the server, please try again later',
          );
        }
        project.status = updatedProject.status;
      }

      if (project.status === 'inProgress') {
        const timeLeft = this.transfromTime(deadlineDate - currentDate);
        project.timeLeft = timeLeft;
      }
    }

    let filteredProjects: ProjectsWithTimeLeft[] | undefined = undefined;
    let filteredFinalProjects: ProjectsWithTimeLeft[] | undefined = undefined;
    let filteredProjectsHasMore: boolean = false;
    if (query.status) {
      filteredProjects = await this.prisma.project.findMany({
        where: { userId, ...filterObj, status: query.status },
        select: {
          createdAt: true,
          updatedAt: true,
          deadline: true,
          title: true,
          favorite: true,
          id: true,
          priority: true,
          progressBar: true,
          status: true,
          completedAt: true,
        },
        take: numberOfProjects + 1,
        skip: page * numberOfProjects,
        orderBy: orderObj,
      });

      filteredFinalProjects = filteredProjects.slice(0, numberOfProjects);
      if (filteredProjects.length === numberOfProjects + 1) {
        filteredProjectsHasMore = true;
      }

      for (const project of filteredFinalProjects) {
        const deadlineDate = new Date(project.deadline).getTime();
        if (project.status === 'inProgress') {
          const timeLeft = this.transfromTime(deadlineDate - currentDate);
          project.timeLeft = timeLeft;
        }
      }
    }

    if (filteredProjects) {
      return {
        projects: filteredFinalProjects,
        hasMore: filteredProjectsHasMore,
      };
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

    const deadline = dto.deadline ? new Date(dto.deadline) : project.deadline;

    let status: status;
    const now = new Date();
    if (now.getTime() < deadline.getTime()) {
      status = 'inProgress';
    } else {
      status = 'backlog';
    }

    if (project.progressBar === 100) {
      status = 'finished';
    }

    const updatedProject = await this.prisma.project.update({
      where: { id: projectId },
      data: { ...dto, deadline, status },
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

  //! UTILS

  transfromTime(time: number) {
    const seconds = Math.floor(time / 1000);
    if (seconds < 60) {
      return `${seconds} seconds`;
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes === 1) {
      return `${minutes} minute`;
    }
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours === 1) {
      return `${hours} hour`;
    }
    if (hours < 24) {
      return `${hours} hours`;
    }
    const days = Math.floor(hours / 24);
    if (days === 1) {
      return `${days} day`;
    }
    if (days < 7) {
      return `${days} days`;
    }
    const weeks = Math.floor(days / 7);
    if (weeks === 1) {
      return `${weeks} week`;
    }
    if (weeks > 1 && days < 31) {
      return `${weeks} weeks`;
    }
    const months = Math.floor(days / 31);
    if (months === 1) {
      return `${months} month`;
    }
    if (months < 12) {
      return `${months} months`;
    }
    const years = Math.floor(months / 12);
    if (years === 1) {
      return `${years} year`;
    }
    return `${years} years`;
  }

  getOrder(query: QueryParamDto) {
    const sortBy = query.srt && query.srt.split('_');

    let orderObj: any = {};
    if (sortBy && sortBy.length === 2) {
      orderObj[sortBy[0]] = sortBy[1];
    } else {
      orderObj['createdAt'] = 'desc';
    }

    return orderObj;
  }

  getFilters(query: QueryParamDto) {
    let filterObj: any = {};
    if (query.favorite) {
      filterObj.favorite = query.favorite === 'true';
    }
    if (query.priority && query.priority !== 'all') {
      filterObj.priority = query.priority;
    }
    if (query.title) {
      filterObj.title = { contains: query.title };
    }

    if (query.deadlineFrom && query.deadlineTo) {
      filterObj.deadline = {
        gte: new Date(query.deadlineFrom),
        lte: new Date(query.deadlineTo),
      };
    }

    if (query.deadlineFrom && !query.deadlineTo) {
      filterObj.deadline = {
        gte: new Date(query.deadlineFrom),
      };
    }

    if (!query.deadlineFrom && query.deadlineTo) {
      filterObj.deadline = {
        lte: new Date(query.deadlineTo),
      };
    }

    if (query.createdFrom && query.createdTo) {
      filterObj.createdAt = {
        gte: new Date(query.createdFrom),
        lte: new Date(query.createdTo),
      };
    }

    if (query.createdFrom && !query.createdTo) {
      filterObj.createdAt = {
        gte: new Date(query.createdFrom),
      };
    }

    if (!query.createdFrom && query.createdTo) {
      filterObj.createdAt = {
        lte: new Date(query.createdTo),
      };
    }

    if (query.updatedFrom && query.updatedTo) {
      filterObj.updatedAt = {
        gte: new Date(query.updatedFrom),
        lte: new Date(query.updatedTo),
      };
    }

    if (query.updatedFrom && !query.updatedTo) {
      filterObj.updatedAt = {
        gte: new Date(query.updatedFrom),
      };
    }

    if (!query.updatedFrom && query.updatedTo) {
      filterObj.updatedAt = {
        lte: new Date(query.updatedTo),
      };
    }

    if (query.completedFrom && query.completedTo) {
      filterObj.completedAt = {
        gte: new Date(query.completedFrom),
        lte: new Date(query.completedTo),
      };
    }

    if (query.completedFrom && !query.completedTo) {
      filterObj.completedAt = {
        gte: new Date(query.completedFrom),
      };
    }

    if (!query.completedFrom && query.completedTo) {
      filterObj.completedAt = {
        lte: new Date(query.completedTo),
      };
    }

    if (query.progressBarFrom && query.progressBarTo) {
      filterObj.progressBar = {
        gte: query.progressBarFrom,
        lte: query.progressBarTo,
      };
    }

    if (query.progressBarFrom && !query.progressBarTo) {
      filterObj.progressBar = {
        gte: query.progressBarFrom,
      };
    }

    if (!query.progressBarFrom && query.progressBarTo) {
      filterObj.progressBar = {
        lte: query.progressBarTo,
      };
    }

    return filterObj;
  }
}
