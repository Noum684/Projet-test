import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Http as HttpService } from './http';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private tokenKey = 'mt_token';
  private orgKey = 'mt_org';
  private userKey = 'mt_user';

  user$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpService) {
    const token = this.getToken();
    if (token) {
      // Optionnel: décoder token pour reconstruire user (basique)
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.user$.next({ id: payload.sub, email: payload.email });
    }
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post('/auth/register', data);
  }

  login(credentials: { email: string; password: string; orgId?: string; }) {
    return this.http.post<{ access_token: string }>('/auth/login', credentials).pipe(
      tap(res => {
        this.setToken(res.access_token);
        const payload = JSON.parse(atob(res.access_token.split('.')[1]));
        this.user$.next({ id: payload.sub, email: payload.email });
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.orgKey);
    localStorage.removeItem(this.userKey);
    this.user$.next(null);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setOrg(orgId: string) {
    localStorage.setItem(this.orgKey, orgId);
  }

  getOrg(): string | null {
    return localStorage.getItem(this.orgKey);
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}
