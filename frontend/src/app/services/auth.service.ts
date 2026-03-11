import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // Add this import
import { Observable } from 'rxjs';  // For typing HTTP responses
import { map, tap } from 'rxjs/operators';  // Import map and tap operators

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private http: HttpClient  // Inject HttpClient here
  ) {}

  // Example login method that makes an HTTP call
  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post('/api/v1/auth/login', credentials).pipe(
      tap((response: any) => {
        this.isAuthenticated = true;
        // Salva token e dados do usuário no localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({
          email: response.email,
          name: response.name,
          userId: response.userId
        }));
      })
    );
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Example: You might want to call a logout API endpoint
    // this.http.post('/api/auth/logout', {}).subscribe();
  }

  isLoggedIn(): boolean {
    // Verifica se há token no localStorage
    return this.isAuthenticated || !!localStorage.getItem('token');
  }

  getUser(): { email: string, name: string, userId: number } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Example method to verify token with server
  checkAuthStatus(): Observable<boolean> {
    interface AuthStatusResponse {
      authenticated: boolean;
    }

    return this.http.get<AuthStatusResponse>('/api/auth/status').pipe(
      map((response: AuthStatusResponse): boolean => {
        this.isAuthenticated = response.authenticated;
        return this.isAuthenticated;
      })
    );
  }

  redirectToLogin(returnUrl: string) {
    this.router.navigate(['/login'], { queryParams: { returnUrl } });
  }

  register(data: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post('/api/v1/auth/register', data);
  }
}