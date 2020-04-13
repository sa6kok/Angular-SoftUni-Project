import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUserLogin } from '../../shared/interfaces/user-login';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { redirectHome } from 'src/app/shared/functions/home-redirect';
import { ToastrService } from 'ngx-toastr';

const INVALID_LOGIN = 'Ivalid username/password. Please try again';
const LOGIN_SUCCESFULL = 'Login succesfull!';
const LOGIN_NOT_SUCCESFULL = 'Login was not succesfull!';
const RETURN_URL = 'returnUrl';
const EMPTY_STRING = '';


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
              private authService: AuthService,
              private toastr: ToastrService) {
    if (this.authService.getUsername()) {
      this.router.navigate([]);
    }
  }

  ngOnInit(): void {
     this.returnUrl = this.activatedRoute.snapshot.queryParams[RETURN_URL] || EMPTY_STRING;
  }

  onSubmit(form: NgForm) {
    let user: IUserLogin;
    user = form.value;
    this.service.login(user).subscribe(
      data => {

        if (data === null) {
          this.message = INVALID_LOGIN;
          this.toastr.error(LOGIN_NOT_SUCCESFULL);
          return;
        }
        this.authService.login(data);
        this.toastr.success(LOGIN_SUCCESFULL);
        if (this.returnUrl !== EMPTY_STRING) {
          return this.router.navigate([this.returnUrl]);
        }
        redirectHome(data.roles, this.router);
      },
      err => {
        this.message = err?.error?.message;
      }
    );
  }

}
