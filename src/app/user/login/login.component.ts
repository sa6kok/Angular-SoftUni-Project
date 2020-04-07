import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUserLogin } from '../interfaces/user-login';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../styles/error-styles.scss']
})
export class LoginComponent implements OnInit {

  message: string;

  constructor(private service: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    let user: IUserLogin;
    user = form.value;
    this.service.login(user).subscribe(resp => {
      if (resp) {
        // TO DO Naivgate to the rigth home;
       return this.router.navigate(['/home/guest']);
      }

      this.message = 'Username/password was not correct';
    });
  }

}
