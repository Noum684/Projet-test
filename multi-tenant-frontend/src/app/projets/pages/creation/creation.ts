import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Projet} from '../../services/projet';

@Component({
  selector: 'app-creation',
  imports: [CommonModule,ReactiveFormsModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule],
  templateUrl: './creation.html',
  styleUrl: './creation.scss',
})
export class Creation {

  form!: FormGroup;
  constructor(private fb: FormBuilder, private projet: Projet, private router: Router) {
    this.form = this.fb.group({
    title: ['', Validators.required],
    description: ['']
  });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const orgId = localStorage.getItem('mt_org') || '';
    const payload = { ...this.form.value, organizationId: orgId };
    this.projet.create(payload).subscribe({
      next: () => this.router.navigate(['/projets']),
      error: (err) => console.error(err)
    });
  }
}
