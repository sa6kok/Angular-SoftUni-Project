import { IProperty } from 'src/app/shared/interfaces/property';
import { IReview } from 'src/app/shared/interfaces/review';
import { ICity } from 'src/app/shared/interfaces/city';

export interface IReservation {
   id: string;
   country: string;
   city: ICity;
   occupancy: number;
   startDate: string;
   endDate: string;
   property: IProperty;
   totalPrice: string;
   review: IReview;
   payed: boolean;
   canceled: boolean;
   past: boolean;
   owner: string;
}
