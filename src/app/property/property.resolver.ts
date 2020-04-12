import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { PropertyService } from './property.service';
import { Observable } from 'rxjs';
import { IProperty } from '../shared/interfaces/property';

@Injectable()
export class PropertyResolver implements Resolve<IProperty[]> {
  constructor(private service: PropertyService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const country = route.paramMap.get('country');
    const city = route.paramMap.get('city');
    const checkIn = route.paramMap.get('start');
    const chaeckOut = route.paramMap.get('end');
    const pax = route.paramMap.get('occupancy');
    if (country === 'my') {
      return this.service.loadMyProperties();
    }
    if (checkIn === null) {
    return this.service.loadPropertiesWhithoutDates(country, city);
    } else {
      return this.service.loadPropertiesWithDates(city, checkIn, chaeckOut, pax);
    }
  }
}
