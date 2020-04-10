import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  today = new Date();

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {}

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get username() {
    return this.authService.getUsername();
  }

  logOut() {
      this.authService.logout();
      this.router.navigate(['/home']);
  }

}
