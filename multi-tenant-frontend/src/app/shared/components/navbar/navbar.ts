import { Component, EventEmitter, Output } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatToolbarModule, MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private auth: Auth, private router: Router) {}

  onToggle() {
    this.toggleSidenav.emit();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  get userEmail(): string | null {
    const user = this.auth.user$.value;
    return user ? user.email : null;
  }
}
