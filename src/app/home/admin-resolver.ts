import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { IUser } from '../shared/interfaces/user';

@Injectable()
export class AdminResolver implements Resolve<IUser[]> {
  constructor(private service: UserService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
      return this.service.getAllUsers();
    }
  }
