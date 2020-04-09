import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositiveNumberDirective } from './directives/positive-number.directive';
import { DetailsPropertyComponent } from './details-property/details-property.component';
import { RoleShowDirective } from './directives/role-show.directive';



@NgModule({
  declarations: [PositiveNumberDirective, DetailsPropertyComponent, RoleShowDirective],
  imports: [
    CommonModule
  ],
  exports: [PositiveNumberDirective, DetailsPropertyComponent, RoleShowDirective]
})
export class SharedModule { }
