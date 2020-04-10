import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IReservation } from '../shared/interfaces/reservation';
import { Location } from '@angular/common';
import { IResaDetails } from 'src/app/reservation/shared/interfaces/reservation-details';
import { IProperty } from 'src/app/property/shared/interfaces/property';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { dateShowPipe } from '../shared/pipes/date-show';
import { ReservationService } from '../reservation.service';
import { Router } from '@angular/router';
import { calculateStayFromStringDates } from '../shared/functions/calculate-stay';


@Component({
  selector: 'app-details-create-reservation',
  templateUrl: './details-create.component.html',
  styleUrls: ['./details-create.component.scss', '../../../styles/error-styles.scss']
})
export class DetailsCreateComponent implements OnInit {

  checkIn: NgbDate;

  checkOut: NgbDate;

  currentProperty: IProperty;

  reservation: IReservation;

  reservationDetails: IResaDetails;

  busyDates: string;

  toPay: boolean;

  totalAmount: number;

  isOccupancyOk: boolean;

  constructor(private location: Location,
              private service: ReservationService,
              private router: Router) {

  }
  ngOnInit(): void {
    // tslint:disable-next-line: no-string-literal
    this.reservationDetails = this.location.getState()['reservationDetails'];
    this.setTotalAmount();
  }

  setTotalAmount() {
    if (this.reservationDetails) {
      this.totalAmount =
        calculateStayFromStringDates(this.reservationDetails.startDate, this.reservationDetails.endDate) * this.currentProperty?.price;
    } else {
      this.totalAmount =
        calculateStayFromStringDates(
          dateShowPipe(this.checkIn), dateShowPipe(this.checkOut)) * this.currentProperty?.price;
    }
  }

  setToPay(checkPayment: boolean) {
    this.toPay = checkPayment;
  }

  selectCheckIn(selectedCheckIn: NgbDate) {
    this.checkIn = selectedCheckIn;
  }

  selectCheckOut(selectedCheckOut: NgbDate) {
    this.checkOut = selectedCheckOut;
    if (selectedCheckOut) {
      this.checkBusyDates();
      this.setTotalAmount();
    }
  }

  checkOccupancy(occupancy: string) {
    if (!occupancy) {
      this.isOccupancyOk = false;
    } else {
      const max = this.currentProperty?.maxOccupancy;
      const current = Number(occupancy);
      this.isOccupancyOk = (current > max);
    }
  }

  checkBusyDates() {
    this.service.checkBusyDates(this.currentProperty.id, dateShowPipe(this.checkIn), dateShowPipe(this.checkOut))
      .subscribe(resp => {
        if (resp === '') {
          this.busyDates = null;
        } else {
          this.busyDates = resp;
        }
      });
  }

  onSubmit(form: NgForm) {
    this.service.saveReservation(form.value, this.currentProperty, this.reservationDetails, this.checkIn, this.checkOut, this.totalAmount)
      .subscribe(resp => {
        if (resp) {
          this.router.navigate(['reservation/reservations/all']);
        }
      });
  }
}
