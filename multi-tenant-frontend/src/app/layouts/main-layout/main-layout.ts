import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar} from '../../shared/components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Loader } from '../../shared/components/loader/loader';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
  standalone: true,
  imports: [RouterModule,Loader, Sidebar, Navbar,
     CommonModule, RouterOutlet,  MatButtonModule],
})
export class MainLayout {
    sidenavOpened= true;
    isLoading= false;


    constructor(private auth: Auth){}

    logout(){
        this.auth.logout();
         window.location.href ='/auth/login';
    }

    toggleSidenav() {
        this.sidenavOpened = !this.sidenavOpened;
    }
}
