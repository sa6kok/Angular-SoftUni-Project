import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUserCreate } from './interfaces/user-register';
import { Observable } from 'rxjs';
import { IUserLogin } from './interfaces/user-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }


  checkUsername(username: string) {
    return  this.http.get<boolean>(`user/check/username/${username}`);
  }

  checkEmail(email: string) {
    return  this.http.get<boolean>(`user/check/email/${email}`);
  }

  register(user: IUserCreate): Observable<boolean> {
    return this.http.post<boolean>('user/register', user, this.httpOptions);
  }

  login(user: IUserLogin): Observable<boolean> {
    return this.http.post<boolean>('user/login', user, this.httpOptions);
  }
}
