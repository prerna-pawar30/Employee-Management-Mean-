import { Component, inject, Inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports:[MatToolbarModule,MatIconModule,RouterLink]
})
export class HeaderComponent {
  router =inject(Router);
  logout() {
    console.log('User logged out');
    // Implement logout functionality
  }
}
