import { Module } from '@nestjs/common';
import { OrganisationsController } from './organisations.controller';
import { OrganisationsService } from './organisations.service';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports :[AuthModule],
  controllers: [OrganisationsController],
  providers: [OrganisationsService, PrismaService, JwtAuthGuard],
})
export class OrganisationsModule {}
