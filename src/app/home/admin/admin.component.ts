import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ICountry } from 'src/app/shared/interfaces/country';
import { Observable } from 'rxjs';
import { PropertyService } from 'src/app/property/property.service';
import {titleCase } from 'src/app/shared/functions/title-case';

const USER_STATUS_CHANGED = 'User status changed succesfully!';
const USER_STATUS_NOT_CHANGED = 'User status was not chaged!';
const ADDED_SUCCESS = ' was succesfully added to DB!';
const ADDED_FAIL = ' was not added to DB!';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss', '../../../styles/error-styles.scss']
})
export class AdminComponent implements OnInit {

  users: IUser[];

  countries$: Observable<ICountry[]> = this.propertyService.loadCountries();

  constructor(private activatedRoute: ActivatedRoute,
              private service: UserService,
              private toastr: ToastrService,
              private propertyService: PropertyService) {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => this.users = data.allUsers);
  }

  changeStatus(userId: string) {
       this.service.changeStatus(userId).subscribe(resp => {
        if (resp) {
            this.service.getAllUsers().subscribe(data => this.users = data);
            this.toastr.success(USER_STATUS_CHANGED);
        } else {
          this.toastr.error(USER_STATUS_NOT_CHANGED);
        }
      });
  }

  countrySubmit(countryForm: NgForm) {
    const country = titleCase(countryForm.value.country);
    this.propertyService.addCountry(country).subscribe(resp => {
      if (resp) {
          this.toastr.success(`${country}${ADDED_SUCCESS}`);
          countryForm.reset();
      } else  {
        this.toastr.error(`${country}${ADDED_FAIL}`);
      }
    });

  }

  citySubmit(cityForm: NgForm) {
    const country = titleCase(cityForm.value.country.name);
    const city = titleCase(cityForm.value.city);
    this.propertyService.addCity(country, city).subscribe(resp => {
      if (resp) {
          this.toastr.success(`${city}${ADDED_SUCCESS}`);
          cityForm.reset();
      } else  {
        this.toastr.error(`${city}${ADDED_FAIL}`);
      }
    });
  }

}
