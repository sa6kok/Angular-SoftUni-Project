import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { AdminComponent } from './admin/admin.component';
import { CoreModule } from '../core/core.module';
import { HomeRoutingModule } from './home-routing.module';
import { GuestComponent } from './guest/guest.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [IndexComponent, AdminComponent, GuestComponent],
  imports: [
    CommonModule,
    CoreModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
