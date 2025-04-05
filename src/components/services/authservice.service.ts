import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  // private apiUrl = 'http://localhost:5000/api/users/register';
  // private apiurl = 'https://simpleappbackend-1.onrender.com/api/users/login';
  // private baseUrl = 'http://localhost:5001/api/posts';
  // private profileUrl = 'http://localhost:5002/api/profile';
  // private crushUrl = 'http://localhost:5006/predict';
  // private profilesection = 'http://localhost:5000/api/users';
  private apiUrl = 'https://simpleappbackend-1.onrender.com/api/users/register';
  private apiurl = 'https://simpleappbackend-1.onrender.com/api/users/login';
  private baseUrl = 'https://simpleappbackend-2.onrender.com/api/posts';
  private profileUrl = 'https://simpleappbackend-1.onrender.com/api/profile';
  private crushUrl = 'https://simpleappbackend-1.onrender.com/predict';
  
  // Your Profile API URL
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
  createPost(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.post(`${this.baseUrl}/create`, formData, { headers });
  }
  getAllPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }
  
  likePost(postId: string, userId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/like/${postId}`, { userId });
  }
  getProfile(userId: string): Observable<any> {
    return this.http.get(`${this.profileUrl}/${userId}`);
  }
  
  // updateProfilePicture(data: any): Observable<any> {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${localStorage.getItem('token')}`
  //   });
  //   return this.http.post(`${this.profileUrl}/update-picture`, data, { headers });
  // }
  
  followUser(followId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const userId = localStorage.getItem('userId'); // must be stored during login
    return this.http.post(`${this.profileUrl}/follow`, { userId, followId }, { headers });
  }
  
  unfollowUser(followId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const userId = localStorage.getItem('userId');
    return this.http.post(`${this.profileUrl}/unfollow`, { userId, followId }, { headers });
  }
  predictCrush(interactionData: {
    likes: number;
    comments: number;
    dms: number;
    responseTime: number;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.crushUrl, interactionData, { headers });
  }
  // addComment(postId: string, commentData: any): Observable<any> {
  //   return this.http.post<any>(`http://localhost:5001/api/posts/${postId}/comments`, commentData);
  // }
  // getUserProfile(userId: string): Observable<any> {
  //   return this.http.get(`http://localhost:5000/api/users/${userId}`);
  // }
  // updateProfilePic(formData: FormData, userId: string): Observable<any> {
  //   return this.http.put(`http://localhost:5000/api/users/${userId}`, formData);
  // }
  // deleteProfilePicture(userId: string): Observable<any> {
  //   return this.http.delete(`http://localhost:5000/api/users/${userId}/profile-picture`);
  // }
  // getUserPosts(userId: string): Observable<any> {
  //   return this.http.get(`http://localhost:5001/api/posts/user/${userId}`);
  // }
  addComment(postId: string, commentData: any): Observable<any> {
    return this.http.post<any>(`https://simpleappbackend-2.onrender.com/api/posts/${postId}/comments`, commentData);
  }
  getUserProfile(userId: string): Observable<any> {
    return this.http.get(`https://simpleappbackend-1.onrender.com/api/users/${userId}`);
  }
  // updateProfilePic(formData: FormData, userId: string): Observable<any> {
  //   return this.http.put(`https://simpleappbackend-2.onrender.com/${userId}`, formData);
  // }
  updateProfilePic(formData: FormData, userId: string): Observable<any> {
    return this.http.put(`https://simpleappbackend-1.onrender.com/api/users/${userId}`, formData);
  }
  
  deleteProfilePicture(userId: string): Observable<any> {
    return this.http.delete(`https://simpleappbackend-1.onrender.com/api/users/${userId}/profile-picture`);
  }
  getUserPosts(userId: string): Observable<any> {
    return this.http.get(`https://simpleappbackend-2.onrender.com/api/posts/${userId}`);
  }
  
  
  
  
  
  
   
}
