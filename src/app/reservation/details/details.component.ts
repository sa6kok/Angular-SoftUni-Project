import { Component, OnInit } from '@angular/core';
import { IReservation } from '../../shared/interfaces/reservation';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ReservationService } from '../reservation.service';
import { ToastrService } from 'ngx-toastr';

const RESA_CANCELED = 'The reservation was canceled successfully!';
const RESA_NOT_CANCELED = 'The reservation was not canceled!';

const RESA_PAYED = 'The reservation was payed successfully!';
const RESA_NOT_PAYED = 'The reservation was not payed!';

const REVIEW_ADDED = 'The review was successfully added to the reservation!';
const REVIEW_NOT_ADDED = 'TThe review was not added to the reservation! Try again!';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  reservations: IReservation[] = [];

  constructor(activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private reservationService: ReservationService,
              private router: Router,
              private toastr: ToastrService) {
    activatedRoute.data.subscribe(data => this.reservations = data.reservationList);
  }

  ngOnInit(): void {
  }

  onSubmit(reviewForm: NgForm, resaId: string) {
    this.reservationService.addReview({level: Number(reviewForm.value.level),
      description: reviewForm.value.description}, resaId).subscribe(resp => {
        if (resp) {
          this.router.navigate(['home/guest']);
          this.toastr.success(REVIEW_ADDED);
        } else {
          this.toastr.success(REVIEW_NOT_ADDED);
        }
      });
  }

  isOwner(username: string): boolean {
    return this.authService.getUsername() === username;
  }

  payResa(reservationId: string) {
    this.reservationService.payResa(reservationId).subscribe(resp => {
      if (resp) {
        this.router.navigate(['/home/guest']);
        this.toastr.success(RESA_PAYED);
      } else {
        this.toastr.error(RESA_NOT_PAYED);
      }
    });
  }

  cancelResa(reservationId: string) {
    this.reservationService.cancelResa(reservationId).subscribe(resp => {
      if (resp) {
        this.router.navigate(['home/guest']);
        this.toastr.success(RESA_CANCELED);
      } else {
        this.toastr.error(RESA_NOT_CANCELED);
      }
    });
  }

}
