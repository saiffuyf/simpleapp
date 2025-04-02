import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { HomeComponent } from '../components/home/home.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { ReelsComponent } from '../components/reels/reels.component';
import { SignupComponent } from '../components/signup/signup.component';
import { LoginComponent } from '../components/login/login.component';
import { authGuard } from '../components/authGuard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },  // Default route redirects to login
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            { path: '', component: HomeComponent },  // Default child route
            { path: 'profile', component: ProfileComponent },
            { path: 'reels', component: ReelsComponent },
        ]
    },
    // { path: '**', redirectTo: 'login' } 
];
