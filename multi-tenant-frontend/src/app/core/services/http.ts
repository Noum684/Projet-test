import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Http {
  //  l'URL du backend
  readonly API_BASE = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  get<T>(path: string) {
    return this.http.get<T>(`${this.API_BASE}${path}`);
  }
  post<T>(path: string, body: any) {
    return this.http.post<T>(`${this.API_BASE}${path}`, body);
  }
  patch<T>(path: string, body: any) {
    return this.http.patch<T>(`${this.API_BASE}${path}`, body);
  }
  delete<T>(path: string) {
    return this.http.delete<T>(`${this.API_BASE}${path}`);
  }
}
