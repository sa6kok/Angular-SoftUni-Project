import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { debounceTime, distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { IUserCreate } from '../interfaces/user-register';
import { ToastrService } from 'ngx-toastr';

const REGISTER_SUCCESS = 'Registration was succesfull! Please log in!';
const REGISTER_FAIL = 'Registration was not successfull!';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../../styles/error-styles.scss']
})
export class RegisterComponent implements OnInit {

  role: string;

  doesUsernameExist$: Observable<boolean>;

  usernameSubject = new Subject<string>();

  emailSubject = new Subject<string>();

  doesEmailExist$: Observable<boolean>;

  constructor(private activatedRoute: ActivatedRoute,
              private service: UserService,
              private router: Router,
              private toastr: ToastrService) {
    this.role = this.activatedRoute.snapshot.params.role;
  }

  ngOnInit(): void {
    this.usernameSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      shareReplay(1),
      map(username => this.service.checkUsername(username))).subscribe(resp => this.doesUsernameExist$ = resp);

    this.emailSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      shareReplay(1),
      map(email => this.service.checkEmail(email))).subscribe(resp => this.doesEmailExist$ = resp);
  }

  onSubmit(form: NgForm) {
    let user: IUserCreate;
    user = {
      username: form.value.username,
      email: form.value.email,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      age: form.value.age,
      password: form.value.passwords.password,
      confirmPassword: form.value.passwords.confirmPassword,
      role: this.role
    };

    this.service.register(user).subscribe(resp => {
      if (resp) {
        this.router.navigate(['user/login']);
        this.toastr.success(REGISTER_SUCCESS);
      } else {
        this.toastr.error(REGISTER_FAIL);
      }
    });
  }

  refreshRole() {
    this.role = this.activatedRoute.snapshot.params.role;
  }

  checkUsername(username: string) {
    this.usernameSubject.next(username);
  }

  checkEmail(email: string) {
    this.emailSubject.next(email);
  }

}
