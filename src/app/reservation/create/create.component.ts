import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ICountry } from 'src/app/shared/interfaces/country';
import { PropertyService } from 'src/app/property/property.service';
import { Observable, from} from 'rxjs';
import { ICity } from 'src/app/shared/interfaces/city';
import { Router } from '@angular/router';
import { dateShowPipe } from '../shared/pipes/date-show';
import {shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss', '../../../styles/error-styles.scss']
})
export class CreateComponent implements OnInit {

  checkIn: NgbDate;
  checkOut: NgbDate;

  countries$: Observable<ICountry[]>;

  cities$: Observable<ICity[]>;

  constructor(private propertyService: PropertyService,
              private router: Router) {
    this.countries$ = propertyService.loadCountries().pipe(shareReplay(1));
  }

  ngOnInit(): void {

  }

  loadCities(country: string) {
    if (country === undefined) {
      this.cities$ = new Observable<ICity[]>();
      return;
    }
    this.cities$ = this.propertyService.loadCities(country).pipe(shareReplay(1));
  }

  selectCheckIn(selectedCheckIn: NgbDate) {
    this.checkIn = selectedCheckIn;
  }
  selectCheckOut(selectedCheckOut: NgbDate) {
    this.checkOut = selectedCheckOut;
  }

  onSubmit(form: NgForm) {
    const city = form.value.city.name;
    const occupancy = form.value.occupancy;
    const start = dateShowPipe(this.checkIn);
    const end = dateShowPipe(this.checkOut);
    this.router.navigate(['property/dates' , {city, start, end, occupancy}]);
  }

}
