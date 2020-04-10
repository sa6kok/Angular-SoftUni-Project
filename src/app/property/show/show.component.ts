import { Component, OnInit } from '@angular/core';
import { IProperty } from '../shared/interfaces/property';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { IResaDetails } from '../../reservation/shared/interfaces/reservation-details';

@Component({
  selector: 'app-show-property',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  properties: IProperty[];

  withDates: boolean;

  reservationDetails: IResaDetails;

  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    const endDate = activatedRoute.snapshot.paramMap.get('end');
    if (endDate !== null) {
      const startDate = activatedRoute.snapshot.paramMap.get('start');
      const occupancy = Number(activatedRoute.snapshot.paramMap.get('occupancy'));
      this.reservationDetails = { startDate, endDate, occupancy };
      this.withDates = true;
    }

    activatedRoute.data.subscribe(data => this.properties = data.propertyList);
  }

  ngOnInit(): void {

  }

  sendProperty(propertyId: string) {
    this.router.navigateByUrl(`/reservation/create/details/${propertyId}`,
    {
      state: {
        reservationDetails: this.reservationDetails
      }
    });
  }

}
