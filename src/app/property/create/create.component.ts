import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ICountry } from '../../shared/interfaces/country';
import { ICity } from '../../shared/interfaces/city';
import { PropertyService } from '../property.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';

const PROPERTY_SUCCESS_CREATED = 'Your property was succesfully created!';
const PROPERTY_NOT_CREATED = 'Your property was not created!';

@Component({
  selector: 'app-create-property',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss', '../../../styles/error-styles.scss']
})
export class CreateComponent implements OnInit {

  countries$: Observable<ICountry[]>;

  cities$: Observable<ICity[]>;

  constructor(private propertyService: PropertyService,
              private router: Router,
              private toastr: ToastrService) {
    this.countries$ = this.propertyService.loadCountries().pipe(shareReplay(1));
  }

  ngOnInit(): void {
  }

  setCities(country: string) {
    if (country === '') {
      this.cities$ = new Observable<ICity[]>();
      return;
    }
    this.cities$ = this.propertyService.loadCities(country).pipe(shareReplay(1));
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
