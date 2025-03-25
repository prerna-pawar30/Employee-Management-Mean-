import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [MatToolbarModule, MatIconModule],
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);
  location = inject(Location);

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