import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  imports: [MatSidenavModule],
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(public authService: AuthService, private sidebarService: SidebarService) {}

  ngAfterViewInit() {
    this.sidebarService.sidebarState$.subscribe((isOpen) => {
      console.log('Sidebar state:', isOpen); // Debugging statement
      if (this.sidenav) {
        if (isOpen) {
          console.log('Trying to open sidebar...');
          this.sidenav.open(); 
        } else {
          console.log('Trying to close sidebar...');
          this.sidenav.close();
        }
      } else {
        console.error('sidenav is undefined');
      }
    });
  }
  
  closeSidebar() {
    this.sidebarService.closeSidebar();
  }
}
