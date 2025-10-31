import { CanActivate, CanActivateFn } from '@angular/router';
import { Auth as AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate  {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) return true;
    this.router.navigate(['/login']);
    return false;
};
}
