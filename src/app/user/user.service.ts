import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUserCreate } from '../shared/interfaces/user-register';
import { Observable } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/user-login';
import { IUser } from '../shared/interfaces/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  checkUsername(username: string) {
    return  this.http.get<boolean>(`user/check/username/${username}`);
  }

  checkEmail(email: string) {
    return  this.http.get<boolean>(`user/check/email/${email}`);
  }

  register(user: IUserCreate): Observable<any> {
    return this.http.post<boolean>('user/register', user, httpOptions);
  }

  login(user: IUserLogin): Observable<any> {
    return this.http.post('user/login', user, httpOptions);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('admin/users');
  }

  changeStatus(userId: string) {
    return this.http.get(`admin/status/${userId}`);
  }

}
