import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProjetService {
  constructor(private prisma: PrismaService) {}

  // Crée le projet si user est membre de l'organisation
  async create(userId: string, data: { title: string; description?: string; organizationId: string }) {
    const membership = await this.prisma.membership.findFirst({
      where: { userId: userId, organizationId: data.organizationId },
    });
    if (!membership) throw new ForbiddenException('Vous n\'êtes pas membre de cette organisation');

    const projet = await this.prisma.projet.create({
      data: {
        title: data.title,
        description: data.description || null,
        organizationId: data.organizationId,
      },
    });
    return projet;
  }

  // Liste les projets d'une organisation
  async findAllByOrganisation(organizationId: string) {
    return this.prisma.projet.findMany({ where: { organizationId } });
  }

  // Supprime le projet si user appartient à l'org
  async remove(userId: string, projectId: string) {
    const proj = await this.prisma.projet.findUnique({ where: { id: projectId } });
    if (!proj) throw new NotFoundException('Projet introuvable');

    const membership = await this.prisma.membership.findFirst({
      where: { userId, organizationId: proj.organizationId },
    });
    if (!membership) throw new ForbiddenException('Non autorisé');

    await this.prisma.projet.delete({ where: { id: projectId } });
    return { ok: true };
  }
}
