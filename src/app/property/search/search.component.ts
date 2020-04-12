import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ICountry } from '../../shared/interfaces/country';
import { PropertyService } from '../property.service';
import { ICity } from '../../shared/interfaces/city';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-property',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss', '../../../styles/error-styles.scss']
})
export class SearchComponent {

  countries$: Observable<ICountry[]> = this.service.loadCountries();

  cities: ICity[];

  hasNoProperties: boolean;

  constructor(
    private service: PropertyService,
    private router: Router) {
  }

  setCities(country: string) {
    if (country === undefined) {
      this.cities = [];
      return;
    }
    this.service.loadCities(country).subscribe(loadedCities => {
      this.cities = loadedCities;
    });
  }

  checkIfProperties(city: string) {
    this.service.checkProprtiesForCity(city).subscribe(resp => this.hasNoProperties = resp);
  }

  onSubmit(form: NgForm) {
    const country = form.value.country.name;
    let city = form.value.city.name;
    if (city === undefined) {
      city = '';
    }
    this.router.navigate([`property/show/${country}`, { city }]);
  }
}
