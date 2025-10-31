import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  // Enregistre un utilisateur et retourne l'objet (sans mot de passe)
  async register(name: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { name, email, password: hashed },
      select: { id: true, name: true, email: true },
    });
    return user;
  }

  // Vérification et retour d'un token JWT (payload contient sub=userId)
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    // retourne user sans mot de passe
    const { password: _p, ...rest } = user as any;
    return rest;
  }

  async login(user: any, orgId?: string) {  
    // payload inclut orgId sélectionnée (nullable)
    const payload = { sub: user.id, email: user.email};
    return {
      access_token: this.jwt.sign(payload),
    };
  }

  // méthode utile: créer membership par défaut si création d'org lors de s  ignup (optionnel)
  async createOrgAndAssign(userId: string, orgName: string) {
    const slug = orgName.toLowerCase().replace(/\s+/g, '-');
    const org = await this.prisma.organization.create({
      data: {
        name: orgName,
        slug,
        memberships: { create: { userId, role: 'OWNER' } },
      },
    });
    return org;
  }
}
