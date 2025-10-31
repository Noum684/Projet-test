import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ProjetService } from './projets.service';
import { CreateProjetDto } from './dto/create-projet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import express from 'express';

@Controller('projets')
@UseGuards(JwtAuthGuard)
export class ProjetController {
  constructor(private projetService: ProjetService) {}

  @Post()
  async create(@Req() req: express.Request, @Body() dto: CreateProjetDto) {
    const user = (req as any).user;
    return this.projetService.create(user.id, dto);
  }

  // GET /projets?orgId=...
  @Get()
  async findAll(@Query('orgId') orgId: string) {
    if (!orgId) return [];
    return this.projetService.findAllByOrganisation(orgId);
  }

  @Delete(':id')
  async remove(@Req() req: express.Request, @Param('id') id: string) {
    const user = (req as any).user;
    return this.projetService.remove(user.id, id);
  }
}
