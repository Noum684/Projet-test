import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Organisation as OrganisationService } from '../../services/organisation';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCard } from '@angular/material/card';
import { MatLabel } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatInput } from '@angular/material/input';


@Component({
  selector: 'app-creation',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatCard, MatLabel, HttpClientModule, MatInput],
  templateUrl: './creation.html',
  styleUrl: './creation.scss',
  exportAs: 'Creation'
})
export class Creation {
  orgForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private organisationService: OrganisationService,
    private router: Router
  ) {
    this.orgForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.orgForm.invalid) return;

    this.organisationService.create(this.orgForm.value).subscribe({
      next: () => this.router.navigate(['/organisations']),
      error: (err: any) => console.error(err),
    });
  }
}
