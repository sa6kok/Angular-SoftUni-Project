import { Component, OnInit } from '@angular/core';
import { IReservation } from '../shared/interfaces/reservation';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  reservations: IReservation[] = [];

  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.data.subscribe(data => this.reservations = data.reservationList);
   }

  ngOnInit(): void {
  }

  onSubmit(reviewForm: NgForm) {

  }
}
