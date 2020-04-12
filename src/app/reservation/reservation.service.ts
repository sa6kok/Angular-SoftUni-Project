import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IReservation } from '../shared/interfaces/reservation';
import { Observable } from 'rxjs';
import { IProperty } from '../shared/interfaces/property';
import { IResaDetails } from '../shared/interfaces/reservation-details';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { IResaCreate } from '../shared/interfaces/reservation-create';
import { dateShowPipe } from './shared/pipes/date-show';
import { IReview } from '../shared/interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  currentPrice: number;


  loadReservattions(filter: string) {
    return this.http.get<IReservation[]>(`reservation/reservations/${filter}`);
  }

  getPropertiesWithDates(country: string, city: string, startDate: string, endDate: string, occupancy: number) {
    this.http.get(``);
  }

  getProperty(propertyId: string): Observable<IProperty> {
   return this.http.get<IProperty>(`property/details/${propertyId}`);
  }


  checkBusyDates(propertyId: string, checkIn: string, checkOut: string): Observable<string> {
    return this.http.get<string>(`reservation/check/${propertyId}/${checkIn}/${checkOut}`);
  }

  saveReservation(form: any, property: IProperty,
                  resaDetails: IResaDetails,
                  checkIn: NgbDate,
                  checkOut: NgbDate,
                  totalAmount: number) {

    let createResa: IResaCreate;
    createResa = {
      country: '',
      city: '',
      occupancy: 0,
      startDate: '',
      endDate: '',
      propertyId: '',
      totalPrice: 0,
      checkPayment: false,
    };

    if (resaDetails) {
      createResa.startDate = resaDetails.startDate,
        createResa.endDate = resaDetails.endDate,
        createResa.occupancy = resaDetails.occupancy;

    } else {
      createResa.startDate = dateShowPipe(checkIn);
      createResa.endDate = dateShowPipe(checkOut);
      createResa.occupancy = form.occupancy;
    }
    createResa.checkPayment = !!form.checkPayment;
    createResa.city = property.city.name;
    createResa.country = property.city.country.name;
    createResa.propertyId = property.id;
    createResa.totalPrice = totalAmount;

    return this.http.post('reservation/details/create', createResa);
  }

  payResa(id: string) {
    return this.http.get(`reservation/pay/${id}`);
  }

  cancelResa(id: string) {
    return this.http.get(`reservation/cancel/${id}`);
  }

  addReview(review: IReview, resaId: string) {
    return this.http.post(`review/create/${resaId}`, review);
  }
}
