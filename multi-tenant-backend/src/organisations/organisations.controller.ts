import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { CreateOrgDto } from './dto/create-org.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('organisations')
@UseGuards(JwtAuthGuard)
export class OrganisationsController {
  constructor(private organisationsService: OrganisationsService) {}

  @Post()
  async create(@Req() req: any, @Body() dto: CreateOrgDto) {
    const userId = req.user.id;
    return this.organisationsService.create(userId, dto);
  }

  @Get()
  async findAll(@Req() req: any) {
    const userId = req.user.id;
    return this.organisationsService.findAllByUser(userId);
  }

  @Delete(':id')
  async remove(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.id;
    return this.organisationsService.remove(userId, id);
  }
}
