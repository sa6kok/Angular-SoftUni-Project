import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean;

  roles: string[];


  constructor(private tokenStorage: TokenStorageService) {
    this.isLoggedIn = !!tokenStorage.getToken();
  }

  logout() {
    this.isLoggedIn = false;
    this.roles = null;
    this.tokenStorage.logOut();
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
