import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  posts: any[] = [];
  currentUserId: string = 'USER_ID_HERE'; 

  constructor(private authService: AuthserviceService,private router: Router) {}

  ngOnInit() {
    this.fetchPosts();
    this.getCurrentUser();
  }

  // fetchPosts() {
  //   this.authService.getAllPosts().subscribe({
  //     next: (response) => {
  //       this.posts = response; // Already randomized from backend
  //     },
  //     // error: (error) => {
  //     //   console.error('Error fetching posts:', error);
  //     // }
  //     error: (error: HttpErrorResponse) => {
  //       console.error('Error fetching posts:', error.message);
  //     }
      

  //   });
  // }
  fetchPosts() {
    this.authService.getAllPosts().subscribe({
      next: (response) => {
        this.posts = response.map((post: any) => ({
          ...post,
          showAllComments: false // 👈 Track comment toggle
        }));
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching posts:', error.message);
      }
    });
  }
 
  getCurrentUser() {
    const userString = localStorage.getItem('user');
    console.log('User from localStorage:', userString);
  
    if (userString) {
      const user = JSON.parse(userString);
      this.currentUserId = user._id || user.id || '';
      console.log('Current User ID:', this.currentUserId);
    } else {
      console.warn('No user found in localStorage.');
    }
  }
  
  // toggleLike(post: any, index: number) {
  //   if (!this.currentUserId) {
  //     console.error('User ID is missing');
  //     return;
  //   }

  //   this.authService.likePost(post._id, this.currentUserId).subscribe({
  //     next: (response) => {
  //       if (response.message === "Liked") {
  //         this.posts[index].likes.push(this.currentUserId); // ✅ Add user to likes list
  //       } else {
  //         this.posts[index].likes = this.posts[index].likes.filter((id: string) => id !== this.currentUserId); // ✅ Remove user
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error liking/unliking post:', error);
  //     }
  //   });
  // }
  toggleLike(post: any, index: number) {
    if (!this.currentUserId) {
      console.error('User ID is missing');
      return;
    }
  
    this.authService.likePost(post._id, this.currentUserId).subscribe({
      next: (response) => {
        if (response.message === "Liked") {
          this.posts[index].likes.push(this.currentUserId); // ✅ Add user to likes list
        } else {
          this.posts[index].likes = this.posts[index].likes.filter((id: string) => id !== this.currentUserId); // ✅ Remove user
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error liking/unliking post:', error.message);
      }
    });
  }
  

  // isLiked(post: any): boolean {
  //   return post.likes.includes(this.currentUserId);
  // } 
  isLiked(post: any): boolean {
    return Array.isArray(post.likes) && post.likes.includes(this.currentUserId);
  }
   
  predictCrushFromPost(targetUserId: string) {
    this.router.navigate(['/dashboard/crush-predictor', targetUserId]);

  }
  addComment(post: any, index: number) {
    const commentText = post.newComment?.trim();
    if (!commentText) return;
  
    const userString = localStorage.getItem('user');
    if (!userString) {
      console.warn('User not logged in');
      return;
    }
  
    const user = JSON.parse(userString);
    const userId = user._id || user.id;
    const username = user.username || 'Anonymous';
  
    this.authService.addComment(post._id, {
      userId,
      username,
      text: commentText
    }).subscribe({
      next: () => {
        // Manually add comment to frontend post object
        if (!Array.isArray(post.comments)) post.comments = [];
        post.comments.push({
          userId,
          username,
          text: commentText
        });
        post.newComment = '';
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding comment:', error.message);
      }
    });
  }
    

}
