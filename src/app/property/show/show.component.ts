import { Component, OnInit } from '@angular/core';
import { IProperty } from '../../shared/interfaces/property';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { IResaDetails } from '../../shared/interfaces/reservation-details';
import { AuthService } from 'src/app/shared/services/auth.service';
import { checkIfCommonElements } from 'src/app/guards/common.elements';

@Component({
  selector: 'app-show-property',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  properties: IProperty[];

  withDates: boolean;

  reservationDetails: IResaDetails;

  constructor(activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) {
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
    if (checkIfCommonElements(this.authService.getUser()?.roles, ['ROLE_HOST'])) {
      this.router.navigate([`property/details/${propertyId}`]);
    } else {
    this.router.navigateByUrl(`/reservation/create/details/${propertyId}`,
     { state: {reservationDetails: this.reservationDetails}
    });
  }
  }

}
