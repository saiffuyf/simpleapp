import { Component } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthserviceService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     this.authService.login(this.loginForm.value).subscribe(
  //       (response: any) => {
  //         console.log('Login Response:', response); // Debugging
  
  //         if (response.token && response.user) {
  //           localStorage.setItem('token', response.token);
  //           // localStorage.setItem('userId', response.user.userId);
  //           localStorage.setItem('userId', response.user.id);

  //           localStorage.setItem('user', JSON.stringify(response.user));
  
  //           console.log('Stored User:', localStorage.getItem('user')); // Debugging
  //           this.router.navigate(['/dashboard']);
  //         } else {
  //           this.errorMessage = 'Invalid response from server';
  //         }
  //       },
  //       (error) => {
  //         console.error('Login error:', error);
  //         this.errorMessage = error.error?.message || 'Invalid credentials';
  //       }
  //     );
  //   }
  // }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          console.log('Login Response:', response); // Debugging
  
          if (response.token && response.user) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.user.id);
  
            // ✅ Store only essential user details to avoid storage quota issues
            const minimalUser = {
              id: response.user.id,
              username: response.user.username,
              email: response.user.email,
              profilePic: response.user.profilePicUrl || '' // only if it's a URL
            };
            localStorage.setItem('user', JSON.stringify(minimalUser));
  
            console.log('Stored Minimal User:', localStorage.getItem('user')); // Debugging
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Invalid response from server';
          }
        },
        (error) => {
          console.error('Login error:', error);
          this.errorMessage = error.error?.message || 'Invalid credentials';
        }
      );
    }
  }
  


}
