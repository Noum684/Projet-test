import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Liste } from './pages/liste/liste';
import { Creation } from './pages/creation/creation';
import { AuthGuard } from '../core/guards/auth-guard';

const routes: Routes = [
  { path: '', component: Liste, canActivate: [AuthGuard] },
  { path: 'create', component: Creation, canActivate: [AuthGuard] },
  { path: ':id/edit', component: Creation, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationsRoutingModule { }
