import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'organisations',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'organisations',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./organisations/organisations-module').then(
        (m) => m.OrganisationsModule
      ),
  },
  {
    path: 'projets',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./projets/projets-module').then((m) => m.ProjetsModule),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
