import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AdminComponent } from './admin/admin.component';
import { GuestComponent } from './guest/guest.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminResolver } from './admin-resolver';

const routes: Routes = [
  {
    path: 'home',
    children:
      [
        {
          path: '',
          component: IndexComponent,
          pathMatch: 'full',
        },
        {
          path: 'admin',
          component: AdminComponent,
          resolve: {allUsers: AdminResolver},
          canActivate: [AuthGuard],
          data: { roles: ['ROLE_ADMIN'] }
        },
        {
          path: 'guest',
          component: GuestComponent,
          canActivate: [AuthGuard],
          data: { roles: ['ROLE_GUEST']}
        }],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
