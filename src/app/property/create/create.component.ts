import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ICountry } from '../../shared/interfaces/country';
import { ICity } from '../../shared/interfaces/city';
import { PropertyService } from '../property.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const PROPERTY_SUCCESS_CREATED = 'Your property was succesfully created!';
const PROPERTY_NOT_CREATED = 'Your property was not created!';

@Component({
  selector: 'app-create-property',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss', '../../../styles/error-styles.scss']
})
export class CreateComponent implements OnInit {

  countries$: Observable<ICountry[]>;

  cities: ICity[];

  constructor(private propertyService: PropertyService,
              private router: Router,
              private toastr: ToastrService) {
    this.countries$ = this.propertyService.loadCountries();
  }

  ngOnInit(): void {
  }

  setCities(country: string) {
    this.propertyService.loadCities(country).subscribe(resp => this.cities = resp);
  }

  onSubmit(form: NgForm) {
    this.propertyService.saveProperty(form.value).subscribe(resp => {
      if (resp) {
        this.router.navigate(['property/show/my']);
        this.toastr.success(PROPERTY_SUCCESS_CREATED);
      } else {
        this.toastr.success(PROPERTY_NOT_CREATED);
      }
    });

  }
}
