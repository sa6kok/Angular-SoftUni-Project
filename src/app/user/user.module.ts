import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { PasswordMatchDirective } from './directives/password-match.directive';
import { MinAgeDirective } from './directives/min-age.directive';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, PasswordMatchDirective, MinAgeDirective],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule
  ],
  exports: [LoginComponent, RegisterComponent],
})
export class UserModule { }
