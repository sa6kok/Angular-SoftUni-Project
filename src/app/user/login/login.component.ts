import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUserLogin } from '../interfaces/user-login';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/shared/token-storage.service';
import { NavComponent } from 'src/app/core/nav/nav.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../styles/error-styles.scss']
})
export class LoginComponent implements OnInit {

  message: string;

  roles: string[];

  constructor(private service: UserService,
              private router: Router,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    /*  if (this.tokenStorage.getToken()) {
       this.isLoggedIn = true;
       this.roles = this.tokenStorage.getUser().roles;
     } */
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
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);


        // this.isLoginFailed = false;
        // this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['/home/guest']);
      },
      err => {
        this.message = err?.error?.message;
        // this.isLoginFailed = true;
      }
    );
  }

}
