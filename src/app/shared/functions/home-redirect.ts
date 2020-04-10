import { Router } from '@angular/router';

export function redirectHome(roles: string[], router: Router) {
  if (roles.includes('ROLE_ADMIN')) {
    return router.navigate(['home/admin']);
  } else if (roles.includes('ROLE_GUEST')) {
    return router.navigate(['home/guest']);
  } else if (roles.includes('ROLE_HOST')) {
    return router.navigate(['property/show/my']);
  } else {
    return router.navigate(['home/index']);
  }
}

