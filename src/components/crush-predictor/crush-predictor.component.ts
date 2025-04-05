// import { Component, OnInit } from '@angular/core';
// import { AuthserviceService } from '../services/authservice.service';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';
// @Component({
//   selector: 'app-crush-predictor',
//   imports: [CommonModule],
//   templateUrl: './crush-predictor.component.html',
//   styleUrl: './crush-predictor.component.css'
// })
// export class CrushPredictorComponent implements OnInit {
//   prediction: any;
//   targetUserId: string = '';
//   userId: string | null = '';
  
//   likes: number = 0;
//   comments: number = 0;
//   dms: number = 0;
//   responseTime: number = 0;

//   constructor(
//     private route: ActivatedRoute,
//     private predictorService: AuthserviceService
//   ) {}

//   ngOnInit() {
//     this.userId = localStorage.getItem('userId');
//     this.route.paramMap.subscribe(params => {
//       const id = params.get('targetUserId');
//       if (id) {
//         this.targetUserId = id;
//       }
//     });
//   }

//   getCrushPrediction() {
//     const interactionData = {
//       likes: this.likes,
//       comments: this.comments,
//       dms: this.dms,
//       responseTime: this.responseTime
//     };

//     this.predictorService.predictCrush(interactionData).subscribe({
//       next: (data) => {
//         this.prediction = data;
//         console.log('Prediction result:', data);
//       },
//       error: (err) => {
//         console.error('Prediction failed', err);
//       }
//     });
//   }

// }

import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crush-predictor',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './crush-predictor.component.html',
  styleUrl: './crush-predictor.component.css'
})
export class CrushPredictorComponent implements OnInit {
  prediction: any = null;
  targetUserId: string = '';
  userId: string = '';
  likes: number = 0;
  comments: number = 0;
  dms: number = 0;
  responseTime: number = 0;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private predictorService: AuthserviceService
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // this.userId = user._id;
    this.userId = user._id || user.id || '';
    this.route.paramMap.subscribe(params => {
      const id = params.get('targetUserId');
      if (id) {
        this.targetUserId = id;
        this.autoCalculateInteractions(); // 👈 auto fill
      }
    });
  }

  autoCalculateInteractions() {
    this.predictorService.getAllPosts().subscribe({
      next: (posts: any[]) => {
        // Posts created by the person you're targeting
        const targetUserPosts = posts.filter(post => post.userId === this.targetUserId);

        // Count how many of those you liked
        this.likes = targetUserPosts.filter(post =>
          post.likes.includes(this.userId)
        ).length;

        // You can implement comments & DMs if you have them
        this.comments = Math.floor(Math.random() * 4);  // 🔁 Simulated
        this.dms = Math.floor(Math.random() * 2);       // 🔁 Simulated
        this.responseTime = Math.floor(Math.random() * 10) + 5; // 🔁 Simulated
      },
      error: (err) => {
        console.error('Error loading posts for predictor', err);
      }
    });
  }

  getCrushPrediction() {
    if (!this.userId || !this.targetUserId) {
      this.errorMessage = 'User ID or Target ID missing';
      return;
    }

    const interactionData = {
      userId: this.userId,
      targetUserId: this.targetUserId,
      likes: this.likes,
      comments: this.comments,
      dms: this.dms,
      responseTime: this.responseTime
    };

    this.loading = true;
    this.errorMessage = '';
    this.predictorService.predictCrush(interactionData).subscribe({
      next: (data) => {
        this.prediction = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Prediction failed.';
        this.loading = false;
      }
    });
  }}
