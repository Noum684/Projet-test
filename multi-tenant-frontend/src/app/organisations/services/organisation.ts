import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Organisation {
  private apiUrl = 'http://localhost:3000/organisations'; 

  constructor(private http: HttpClient) {}

  // Récupérer toutes les organisations
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //Créer une organisation
  create(data: { name: string; description?: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  //Supprimer une organisation
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  //Mettre à jour une organisation
  updatOrganisation(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  //Récupérer une organisation spécifique
  getById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  
}
