import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReservationService } from '../reservation.service';
import { IReservation } from '../../shared/interfaces/reservation';

@Injectable()
export class ReservationResolver implements Resolve<IReservation[]> {
  constructor(private service: ReservationService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const filter = route.params.filter;
    return this.service.loadReservattions(filter);
  }
}
