import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AdminComponent } from './admin/admin.component';
import { GuestComponent } from './guest/guest.component';

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
      component: AdminComponent
    },
    {
      path: 'guest',
      component: GuestComponent
    }],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
