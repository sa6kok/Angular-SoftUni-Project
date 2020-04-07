import { Component, OnInit, Input } from '@angular/core';
import { IProperty } from 'src/app/property/shared/interfaces/property';

@Component({
  selector: 'app-details-property',
  templateUrl: './details-property.component.html',
  styleUrls: ['./details-property.component.scss']
})
export class DetailsPropertyComponent implements OnInit {

  @Input() selectedProperty: IProperty;

  property: IProperty;

  seeReviews: boolean;

  constructor() { }

  ngOnInit(): void {
    this.property = this.selectedProperty;
  }

  showReviews() {
    this.seeReviews = !this.seeReviews;
  }

}
