import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { OrganisationsRoutingModule } from './organisations-routing-module';
// import { ListeComponent } from './pages/liste/liste.component';
// import { CreationComponent } from './pages/creation/creation.component';
import { Liste } from './pages/liste/liste';
import { Creation } from './pages/creation/creation';

@NgModule({
  declarations: [],
  imports: [
    Liste,
    Creation,
    CommonModule,
    OrganisationsRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatIconModule
  ]
})
export class OrganisationsModule { }
