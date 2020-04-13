import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IReservation } from '../../shared/interfaces/reservation';
import { Location } from '@angular/common';
import { IResaDetails } from 'src/app/shared/interfaces/reservation-details';
import { IProperty } from 'src/app/shared/interfaces/property';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { dateShowPipe } from '../shared/pipes/date-show';
import { ReservationService } from '../reservation.service';
import { Router } from '@angular/router';
import { calculateStayFromStringDates } from '../../shared/functions/calculate-stay';
import { ToastrService } from 'ngx-toastr';
import { isOccupancyAllowed } from 'src/app/shared/functions/allowed-occupancy';

const RESERVATION_SUCCESS = 'Reservation made successfully!';
const RESERVATION_FAIL = 'Resevation was not made!';
const RESA_DETAILS = 'reservationDetails';
const EMPTY_STRING = '';


@Component({
  selector: 'app-details-create-reservation',
  templateUrl: './details-create.component.html',
  styleUrls: ['./details-create.component.scss', '../../../styles/error-styles.scss']
})
export class DetailsCreateComponent implements OnInit {

  checkIn: NgbDate;

  checkOut: NgbDate;

  currentProperty: IProperty;

  reservationDetails: IResaDetails;

  busyDates: string;

  toPay: boolean;

  isOccupancyOk: boolean;

  constructor(private location: Location, private service: ReservationService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.reservationDetails = this.location.getState()[RESA_DETAILS];
  }

  selectedPropertyHandler(property: IProperty) {
    this.currentProperty = property;
  }


  get totalAmount() {
    if (this.reservationDetails) {
      return calculateStayFromStringDates(this.reservationDetails.startDate, this.reservationDetails.endDate) * this.currentProperty?.price;
    } else {
     return calculateStayFromStringDates(
          dateShowPipe(this.checkIn), dateShowPipe(this.checkOut)) * this.currentProperty?.price;
    }
  }

  selectCheckIn(selectedCheckIn: NgbDate) {
    this.checkIn = selectedCheckIn;
  }

  selectCheckOut(selectedCheckOut: NgbDate) {
    this.checkOut = selectedCheckOut;
    if (selectedCheckOut) {
      this.checkBusyDates();
    }
  }

  checkOccupancy(occupancy: string) {
    this.isOccupancyOk = isOccupancyAllowed(occupancy, this.currentProperty.maxOccupancy);
  }

  checkBusyDates() {
    this.service.checkBusyDates(this.currentProperty?.id, dateShowPipe(this.checkIn), dateShowPipe(this.checkOut))
      .subscribe(resp => {
        if (resp === EMPTY_STRING) {
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
          this.toastr.success(RESERVATION_SUCCESS);
        } else {
          this.toastr.error(RESERVATION_FAIL);
        }
      });
  }
}
