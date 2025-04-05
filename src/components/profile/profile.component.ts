import { Component,OnInit } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-profile',
  imports: [CommonModule,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userId: string = localStorage.getItem('userId') || '';
  username: string = '';
  profilePicture: string = '';
  posts: any[] = [];
  selectedFile: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthserviceService) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadUserPosts();
  }

  loadUserProfile(): void {
    this.authService.getUserProfile(this.userId).subscribe({
      next: (data) => {
        this.username = data.username;
        this.profilePicture = data.profilePicture || ''; // Avoid undefined
      },
      error: () => {
        this.errorMessage = 'Failed to load user profile.';
      }
    });
  }

  loadUserPosts(): void {
    this.authService.getUserPosts(this.userId).subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load posts.';
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  updateProfilePic(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('profilePicture', this.selectedFile);

    this.authService.updateProfilePic(formData, this.userId).subscribe({
      next: () => {
        this.successMessage = 'Profile picture updated successfully!';
        this.errorMessage = '';
        this.selectedFile = null;
        this.loadUserProfile();
      },
      error: () => {
        this.errorMessage = 'Failed to upload profile picture.';
        this.successMessage = '';
      }
    });
  }

  deleteProfilePic(): void {
    this.authService.deleteProfilePicture(this.userId).subscribe({
      next: () => {
        this.successMessage = 'Profile picture deleted.';
        this.errorMessage = '';
        this.profilePicture = '';
      },
      error: () => {
        this.errorMessage = 'Failed to delete profile picture.';
        this.successMessage = '';
      }
    });
  }
}

