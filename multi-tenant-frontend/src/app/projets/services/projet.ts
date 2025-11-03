import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environnement } from '../../../environnements/environnement';

@Injectable({
  providedIn: 'root'
})
export class Projet {
  private base =  `${environnement.apiUrl}/dashboard/projets`;

  constructor(private http: HttpClient) {}

  getAll(orgId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}?orgId=${orgId}`);
  }

  create(payload: any): Observable<any> {
    return this.http.post<any>(this.base, payload);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.base}/${id}`);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.base}/${id}`);
  }
}
