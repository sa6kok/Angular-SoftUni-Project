import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICountry } from '../shared/interfaces/country';
import { ICity } from '../shared/interfaces/city';
import { IProperty } from '../shared/interfaces/property';
import { IPropertyCreate } from '../shared/interfaces/property-create';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  loadCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>('search/country');
  }

  loadCities(country: string): Observable<ICity[]> {
    return this.http.get<ICity[]>(`search/cities/${country}`);
  }

  checkProprtiesForCity(city: string) {
    return this.http.get<boolean>(`search/check/${city}`);
  }

  loadPropertiesWhithoutDates(country: string, city?: string): Observable<IProperty[]> {
    if (city === null || city === undefined) {
      city = '';
    } else {
      city = `/${city}`;
    }
    return this.http.get<IProperty[]>(`search/show/${country}${city}`);
  }

  loadPropertiesWithDates(city: string, startDate: string, endDate: string, occupancy: string): Observable<IProperty[]> {

    return this.http.get<IProperty[]>(`reservation/create/${city}/${startDate}/${endDate}/${occupancy}`);
  }

  loadMyProperties(): Observable<IProperty[]> {
    return this.http.get<IProperty[]>('property/my');
  }

  saveProperty(property: IPropertyCreate): Observable<boolean> {
    return this.http.post<boolean>('property/create', property);
  }

  addPicture(propertyId: string, pictureUrl: string) {
    return this.http.post('property/picture/add', {propertyId , pictureUrl});
  }

  getProperty(id: string) {
    return this.http.get(`property/details/${id}`);
  }

  addCity(country: string, city: string) {
    return this.http.post('admin/city/add', {country, city});
  }

  addCountry(country: string) {
    return this.http.post('admin/country/add', {country});
  }
}
