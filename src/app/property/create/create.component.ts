import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ICountry } from '../../shared/interfaces/country';
import { ICity } from '../../shared/interfaces/city';
import { PropertyService } from '../property.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-property',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss', '../../../styles/error-styles.scss']
})
export class CreateComponent implements OnInit {

  countries$: Observable<ICountry[]>;

  cities: ICity[];

  constructor(private propertyService: PropertyService,
              private router: Router) {
    this.countries$ = this.propertyService.loadCountries();
  }

  ngOnInit(): void {
  }

  setCities(country: string) {
    this.propertyService.loadCities(country).subscribe(resp => this.cities = resp);
  }

  createCity(country: string) {

  }

  onSubmit(form: NgForm) {
    this.propertyService.saveProperty(form.value).subscribe(resp => {
      if (resp) {
        this.router.navigate(['property/show/my']);
      }
    });

  }
}
