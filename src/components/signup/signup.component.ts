import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-signup',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  signupForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  

  constructor(private fb: FormBuilder, private userService: AuthserviceService) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.userService.registerUser(this.signupForm.value)
      .subscribe({
        next: (response) => {
          this.successMessage = 'Registration successful!';
          this.signupForm.reset();
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Signup failed. Please try again.';
        }
      })
      .add(() => this.isSubmitting = false);
  }

  getControl(controlName: string) {
    return this.signupForm.get(controlName);
  }

}
