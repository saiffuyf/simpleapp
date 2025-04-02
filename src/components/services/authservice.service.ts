import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private apiUrl = 'http://localhost:5000/api/users/register';
  private apiurl = 'http://localhost:5000/api/users/login';
  constructor(private http: HttpClient,private router: Router) {}
  
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiurl, credentials);
  }
  logout() {
    localStorage.removeItem('token'); // Remove token from storage
    this.router.navigate(['/login']); // Redirect to login
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Check if user is authenticated
  }
}
