import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { IProperty } from 'src/app/property/shared/interfaces/property';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/property/property.service';
import { ReservationService } from 'src/app/reservation/reservation.service';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-details-property',
  templateUrl: './details-property.component.html',
  styleUrls: ['./details-property.component.scss']
})
export class DetailsPropertyComponent implements OnInit {

  @Input() selectedProperty: IProperty;

  @Output() currentPropertyChild = new EventEmitter<IProperty>();

  property: IProperty;

  seeReviews: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private service: ReservationService,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (this.selectedProperty) {
      this.property = this.selectedProperty;
    } else {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.service.getProperty(id).subscribe(data => {
        if (data) {
          this.property = data;
          this.sendCurrentProperty();
        }
      });
    }
  }

  showReviews() {
    this.seeReviews = !this.seeReviews;
  }

  sendCurrentProperty() {
    this.currentPropertyChild.emit(this.property);
  }

  get isOwner() {
    return this.property?.owner === this.authService?.getUsername();
  }

}
