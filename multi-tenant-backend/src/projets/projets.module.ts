import { Module } from '@nestjs/common';
import { ProjetController } from './projets.controller';
import { ProjetService } from './projets.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ProjetController],
  providers: [ProjetService, PrismaService, JwtAuthGuard],
})
export class ProjetModule {}
