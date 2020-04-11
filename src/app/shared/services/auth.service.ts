import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { ToastrService } from 'ngx-toastr';

const LOGOUT_SUCESS = 'You just logged out!';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean;

  roles: string[];


  constructor(private tokenStorage: TokenStorageService,
              private toastr: ToastrService) {
    this.isLoggedIn = !!tokenStorage.getToken();
  }

  logout() {
    this.isLoggedIn = false;
    this.roles = null;
    this.tokenStorage.logOut();
    this.toastr.success(LOGOUT_SUCESS);
  }

  login(data: any) {
    this.tokenStorage.saveToken(data.accessToken);
    this.tokenStorage.saveUser(data);
    this.isLoggedIn = true;
    this.roles = this.tokenStorage.getUser().roles;
  }

  getUsername() {
   return this.tokenStorage.getUser()?.username;
  }

  getUser() {
    return this.tokenStorage.getUser();
  }
}
