import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { ShowComponent } from './show/show.component';
import { ShortDescPipe } from './pipes/short-desc.pipe';
import { AverageReviewsPipe } from './pipes/average-reviews.pipe';
import { PropertyRoutingModule } from './property-routing.module';



@NgModule({
  declarations: [CreateComponent, SearchComponent, ShowComponent, ShortDescPipe, AverageReviewsPipe],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PropertyRoutingModule
  ],
  exports: [CreateComponent, SearchComponent, ShowComponent]
})
export class PropertyModule { }
