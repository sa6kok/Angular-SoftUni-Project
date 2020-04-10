import { Component, OnInit, DoCheck } from '@angular/core';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isNavbarCollapsed = true;

  constructor(private authService: AuthService) { }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get roles(): string[] {
    return this.authService.roles;
  }
}
