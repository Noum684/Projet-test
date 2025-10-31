import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Organisation as OrganisationService } from '../../services/organisation';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-liste',
  imports: [CommonModule, MatCard, MatIconModule, MatTableModule],
  templateUrl: './liste.html',
  styleUrl: './liste.scss',
  exportAs: 'Liste'
})
export class Liste {
  displayedColumns = ['name', 'description', 'actions'];
  organisations: any[] = [];

  constructor(
    private organisationService: OrganisationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrganisations();
  }

  loadOrganisations(): void {
    this.organisationService.getAll().subscribe({
      next: (data: any[]) => (this.organisations = data),
      error: (err: any) => console.error(err),
    });
  }

  goToCreate(): void {
    this.router.navigate(['/organisations/create']);
  }

  deleteOrganisation(id: string): void {
    if (confirm('Supprimer cette organisation ?')) {
      this.organisationService.delete(id).subscribe(() => {
        this.loadOrganisations();
      });
    }
  }
}
