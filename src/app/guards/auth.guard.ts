import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import { checkIfCommonElements } from './common.elements';

const NOT_AUTHORIZED = 'Access not authorized! You need to log in again!';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, stateMain: RouterStateSnapshot) {
        const currentUser = this.authenticationService.getUser();
        if (currentUser) {
            if (route.data.roles && !checkIfCommonElements(currentUser.roles, route.data.roles)) {
                this.router.navigate(['error'], {queryParams: {error: NOT_AUTHORIZED}});
                this.authenticationService.logout();
                return false;
            }
            return true;
        }
        this.router.navigate(['user/login'], { queryParams: { returnUrl: stateMain.url }});
        return false;
    }
}
