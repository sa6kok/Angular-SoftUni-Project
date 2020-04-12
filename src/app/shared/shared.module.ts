import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositiveNumberDirective } from './directives/positive-number.directive';
import { DetailsPropertyComponent } from './details-property/details-property.component';
import { RoleShowDirective } from './directives/role-show.directive';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PositiveNumberDirective, DetailsPropertyComponent, RoleShowDirective],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [PositiveNumberDirective, DetailsPropertyComponent, RoleShowDirective]
})
export class SharedModule { }
