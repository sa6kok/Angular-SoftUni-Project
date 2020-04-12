import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { AdminComponent } from './admin/admin.component';
import { CoreModule } from '../core/core.module';
import { HomeRoutingModule } from './home-routing.module';
import { GuestComponent } from './guest/guest.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminResolver } from './admin-resolver';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [IndexComponent, AdminComponent, GuestComponent],
  imports: [
    CommonModule,
    CoreModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [AdminResolver]
})
export class HomeModule { }
