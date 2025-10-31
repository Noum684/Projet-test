import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { OrganisationsModule } from './organisations/organisations.module';
import { ProjetModule } from './projets/projets.module';


@Module({
  imports: [AuthModule,OrganisationsModule,ProjetModule],
  controllers: [AppController],
  providers: [PrismaService, AppService, JwtService],
})
export class AppModule {}
