import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OrganisationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: { name: string; description?: string }) {
    const slug = data.name.toLowerCase().replace(/\s+/g, '-');
    const org = await this.prisma.organization.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        memberships: { create: { userId, role: 'OWNER' } },
      },
    });
    return org;
  }

  async findAllByUser(userId: string) {
    // retourne les orgs où l'utilisateur a une membership
    return this.prisma.organization.findMany({
      where: { memberships: { some: { userId } } },
      include: { memberships: true },
    });
  }

  async remove(userId: string, orgId: string) {
    // seulement owner peut supprimer
    const membership = await this.prisma.membership.findUnique({
      where: { userId_organizationId: { userId, organizationId: orgId } },
    });
    if (!membership || membership.role !== 'OWNER') throw new ForbiddenException('Non autorisé');
    await this.prisma.organization.delete({ where: { id: orgId } });
    return { ok: true };
  }
}
