import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Projet } from '../../services/projet';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-liste',
  imports: [CommonModule,MatButtonModule,MatCardModule,MatIconModule, NgFor],
  templateUrl: './liste.html',
  styleUrl: './liste.scss',
})
export class Liste {
  projets: any[]=[];
  loading = false;

  constructor(private projet:Projet, private router : Router) {
    this.load();
  }

  load(){
    this.loading = true;
    const orgId = localStorage.getItem('mt_org')|| '' ;
    this.projet.getAll(orgId).subscribe({
      next:(data) =>{
        this.projets = data ?? [];
        this.loading = false;
      },
      error:(err)=>{
        console.error(err);
        this.loading= false;
      }
    });
  }

    goCreate() {
      this.router.navigate(['/projets/pages/creation']);
    };

    deleteProjet(id: string){

      if(!confirm('Supprimer ce projet'))
        return;
      this.projet.delete(id).subscribe({
        next:()=>this.load(),
        error:(err)=> console.error(err)
      });
    }
   }

