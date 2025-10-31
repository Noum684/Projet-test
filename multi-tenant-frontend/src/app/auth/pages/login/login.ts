import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth as AuthService } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { MatCardModule} from "@angular/material/card";
import { MatFormFieldModule} from "@angular/material/form-field";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule} from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, MatCardModule, MatFormFieldModule,HttpClientModule, ReactiveFormsModule, FormsModule, MatIconModule, MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  loginForm!: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login({email, password}).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Enregistre le token dans le localStorage
        localStorage.setItem('token', response.access_token);
        this.router.navigate(['/organisations']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login failed', err);
      }
    });
  }
}
