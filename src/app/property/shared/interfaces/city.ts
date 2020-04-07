import { ICountry } from './country';

export interface ICity {
  id: string;
  name: string;
  country: ICountry;
}
