import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositiveNumberDirective } from './directives/positive-number.directive';
import { DetailsPropertyComponent } from './details-property/details-property.component';



@NgModule({
  declarations: [PositiveNumberDirective, DetailsPropertyComponent],
  imports: [
    CommonModule
  ],
  exports: [PositiveNumberDirective, DetailsPropertyComponent]
})
export class SharedModule { }
