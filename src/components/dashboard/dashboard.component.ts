import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 
// import { faHome,faCompass,faEllipsis, faVideo, faPlusSquare, faUser, faEllipsisH, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faHome, faEllipsisH,faCompass, faVideo, faPlusSquare, faUser, faEllipsis, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterOutlet,RouterLink,FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private authService: AuthserviceService) {}
  logout() {
    this.authService.logout();  // Call the logout function
  }
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  } 
  faHome = faHome;
  faExplore = faCompass;
  faReels = faVideo;
  faCreate = faPlusSquare;
  faProfile = faUser;
  faMore = faEllipsis;
  faLogout = faSignOutAlt;
  faEllipsisH = faEllipsisH;

}
