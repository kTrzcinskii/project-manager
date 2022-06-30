import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { GoalModule } from './goal/goal.module';
import { StatsModule } from './stats/stats.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    ProjectModule,
    GoalModule,
    StatsModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
