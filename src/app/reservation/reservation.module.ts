import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { NgbdDatepickerRangeComponent } from './ngbd-datepicker-range/ngbd-datepicker-range.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DetailsCreateComponent as DetailsReservation } from './details-create/details-create.component';
import { DateShowPipe } from './shared/pipes/date-show.pipe';
import { ReservationRoutingModule } from './reservation-routing.module';
import { DetailsComponent } from './details/details.component';
import { ReservationResolver } from './details/reservation-details.resolver';
import { DateShowDbPipe } from './shared/pipes/date-show-db.pipe';
import { ShowCorectNumberPipe } from './shared/pipes/show-corect-number.pipe';



@NgModule({
  declarations: [CreateComponent, NgbdDatepickerRangeComponent, DateShowPipe,
    DetailsReservation, DetailsComponent, DateShowDbPipe, ShowCorectNumberPipe],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    SharedModule,
    ReservationRoutingModule
  ],
  providers: [ReservationResolver],
  exports: [NgbdDatepickerRangeComponent, CreateComponent, DetailsReservation],
})
export class ReservationModule { }
