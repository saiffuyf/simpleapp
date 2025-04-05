import { Component } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create',
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  selectedFile: File | null = null;
  caption: string = '';

  constructor(private postService: AuthserviceService) {}

  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Create post
  // createPost() {
  //   if (!this.selectedFile || !this.caption.trim()) {
  //     alert('Please select an image and enter a caption.');
  //     return;
  //   }

  //   // Retrieve user details from localStorage (or use a user service)
  //   const user = JSON.parse(localStorage.getItem('user') || '{}');

  //   if (!user.id) {
  //     alert('User is not logged in. Please log in first.');
  //     return;
  //   }

  //   this.postService.createPost(this.selectedFile, this.caption, user.id, user.username, user.profilePicture)
  //     .subscribe({
  //       next: (response) => {
  //         console.log('Post created successfully:', response);
  //         alert('Post created successfully!');
  //       },
  //       error: (error) => {
  //         console.error('Error creating post:', error);
  //         alert('Failed to create post.');
  //       }
  //     });
  // }
  createPost() {
    if (!this.selectedFile || !this.caption.trim()) {
      alert('Please select an image and enter a caption.');
      return;
    }
  
    const user = JSON.parse(localStorage.getItem('user') || '{}');
  
    if (!user.id) {
      alert('User is not logged in. Please log in first.');
      return;
    }
  
    // ✅ Create FormData for file upload
    const formData = new FormData();
    formData.append('image', this.selectedFile); // Key must match 'image' in backend
    formData.append('caption', this.caption);
    formData.append('userId', user.id);
    formData.append('username', user.username);
    formData.append('profilePicture', user.profilePicture || ''); 
  
    console.log("🔍 Sending Post Data:", Object.fromEntries(formData.entries()));
  
    this.postService.createPost(formData)
      .subscribe({
        next: (response) => {
          console.log('✅ Post created successfully:', response);
          alert('Post created successfully!');
        },
        error: (error) => {
          console.error('❌ Error creating post:', error);
          alert('Failed to create post.');
        }
      });
  }
    

}
