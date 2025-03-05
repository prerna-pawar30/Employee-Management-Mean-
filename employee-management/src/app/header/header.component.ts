import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports:[MatToolbarModule,MatIconModule]
})
export class HeaderComponent {
  logout() {
    console.log('User logged out');
    // Implement logout functionality
  }
}
