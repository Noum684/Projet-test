import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    component: MainLayout,
    canActivate: [AuthGuard],
    children: [
      {
    path: 'organisations',
    loadChildren: () =>
      import('./organisations/organisations-module').then(
        (m) => m.OrganisationsModule),
  },
  {
    path: 'projets',
    loadChildren: () =>
      import('./projets/projets-module').then((m) => m.ProjetsModule),
  },

  {
    path: '',
    redirectTo: 'organisations', pathMatch: 'full',
  },
],
},
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
