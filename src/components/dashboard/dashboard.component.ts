import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterOutlet,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private authService: AuthserviceService) {}
  logout() {
    this.authService.logout();  // Call the logout function
  }

}
