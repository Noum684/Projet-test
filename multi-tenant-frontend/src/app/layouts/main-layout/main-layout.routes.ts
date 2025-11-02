import { Routes} from '@angular/router';
import { MainLayout } from './main-layout';
import { OrganisationsRoutingModule } from '../../organisations/organisations-routing-module';
import { ProjetsRoutingModule } from '../../projets/projets-routing-module';

export const MainLayoutRoutes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'organisations',
        // children:OrganisationsRoutingModule.routes
      },
    ]
}
];