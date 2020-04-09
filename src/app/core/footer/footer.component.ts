import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TokenStorageService } from 'src/app/shared/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  today = new Date();

  constructor(private tokenStorage: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {}

  get isLoggedIn() {
    return this.tokenStorage.isLoggedIn;
  }

  get username() {
    return this.tokenStorage.getUser()['username'];
  }

  logOut() {
      this.tokenStorage.logOut();
      this.router.navigate(['/home']);
  }

}
