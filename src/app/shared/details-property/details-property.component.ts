import { Component, OnInit, Input } from '@angular/core';
import { IProperty } from 'src/app/property/shared/interfaces/property';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/property/property.service';
import { ReservationService } from 'src/app/reservation/reservation.service';

@Component({
  selector: 'app-details-property',
  templateUrl: './details-property.component.html',
  styleUrls: ['./details-property.component.scss']
})
export class DetailsPropertyComponent implements OnInit {

  @Input() selectedProperty: IProperty;

  property: IProperty;

  seeReviews: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private service: ReservationService) { }

  ngOnInit(): void {
    if (this.selectedProperty) {
      this.property = this.selectedProperty;
    } else {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getProperty(id).subscribe(data => {
      console.log(data);
      this.property = data;
    });
  }
  }

  showReviews() {
    this.seeReviews = !this.seeReviews;
  }

}
