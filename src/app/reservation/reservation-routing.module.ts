import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { ReservationResolver } from './details/reservation-details.resolver';
import { DetailsCreateComponent } from './details-create/details-create.component';
const routes: Routes = [
    {
      path: 'reservation',
    children: [
      {path: 'create', component: CreateComponent},
      {path: 'create/details', component: DetailsCreateComponent},
      {path: 'reservations/:filter', resolve: {reservationList: ReservationResolver},  component: DetailsComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
