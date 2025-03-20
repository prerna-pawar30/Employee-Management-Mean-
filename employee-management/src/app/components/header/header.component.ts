import { Component, inject, Inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl:'./header.component.css',
  imports: [MatToolbarModule, MatIconModule, RouterLink, CommonModule, MatMenuModule]

})
export class HeaderComponent {
  router = inject(Router);
  location = inject(Location);
  authService = inject(AuthService);
  sidenav: any;
  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  
  }

  goBack(): void {
    this.location.back();
  }
}
