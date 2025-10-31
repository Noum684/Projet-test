import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /auth/register
  // Crée un nouvel utilisateur
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto.name, dto.email, dto.password);
    return { user };
  }

  // POST /auth/login
  // Connecte un utilisateur et retourne un JWT
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe invalide');
    }
    return this.authService.login(user);
  }
}
