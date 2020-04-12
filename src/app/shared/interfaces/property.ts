import { ICity } from './city';
import { IReview } from './review';

export interface IProperty {
  name: string;
  description: string;
  id: string;
  price: number;
  maxOccupancy: number;
  street: string;
  streetNumber: number;
  streetNumberAddition: string;
  floor: number;
  apartment: number;
  city: ICity;
  pictures: string[];
  firstPicture: string;
  busyDates: Date[];
  reviews: IReview[];
  fullStreet: string;
  averageReviews: string;
  owner: string;
}
