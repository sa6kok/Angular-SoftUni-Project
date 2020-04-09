import { Component, OnInit, DoCheck } from '@angular/core';
import { TokenStorageService } from 'src/app/shared/token-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isNavbarCollapsed = true;

  constructor(private tokenService: TokenStorageService) { }

  get isLoggedIn() {
    return this.tokenService.isLoggedIn;
  }

  get roles(): string[] {
    return this.tokenService.roles;
  }
}
