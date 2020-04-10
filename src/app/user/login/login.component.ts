import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUserLogin } from '../interfaces/user-login';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import {Location} from '@angular/common';
import { redirectHome } from 'src/app/shared/functions/home-redirect';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../styles/error-styles.scss']
})
export class LoginComponent implements OnInit {

  message: string;

  roles: string[];

  returnUrl: string;

  constructor(private service: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
    if (this.authService.getUsername()) {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    /*  if (this.tokenStorage.getToken()) {
       this.isLoggedIn = true;
       this.roles = this.tokenStorage.getUser().roles;
     } */
     this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '';

  }

  onSubmit(form: NgForm) {
    let user: IUserLogin;
    user = form.value;
    this.service.login(user).subscribe(
      data => {

        if (data === null) {
          this.message = 'Ivalid username/password. Please try again';
          return;
        }
        this.authService.login(data);
        if (this.returnUrl !== '') {
          return this.router.navigate([this.returnUrl]);
        }
        // this.isLoginFailed = false;
        // this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;

        redirectHome(data.roles, this.router);
      },
      err => {
        this.message = err?.error?.message;
        // this.isLoginFailed = true;
      }
    );
  }

}
