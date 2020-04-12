import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { IProperty } from 'src/app/shared/interfaces/property';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from 'src/app/reservation/reservation.service';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { PropertyService } from 'src/app/property/property.service';
import { ToastrService } from 'ngx-toastr';

const PICTURE_ADDED = 'Picture added successfully!';
const PICTURE_NOT_ADDED = 'Picture was not added!';

@Component({
  selector: 'app-details-property',
  templateUrl: './details-property.component.html',
  styleUrls: ['./details-property.component.scss', '../../../styles/error-styles.scss']
})
export class DetailsPropertyComponent implements OnInit {

  @Input() selectedProperty: IProperty;

  @Output() currentPropertyChild = new EventEmitter<IProperty>();

  property: IProperty;

  seeReviews: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private service: ReservationService,
              private authService: AuthService,
              private propertyService: PropertyService,
              private toastr: ToastrService) { }

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

  pictureSubmit(form: NgForm, propertyId: string) {
    this.propertyService.addPicture( propertyId, form.value.pictureUrl).subscribe(resp => {
      if (resp) {
        this.propertyService.getProperty(propertyId).subscribe(data => this.property = data as any);
        form.reset();
        this.toastr.success(PICTURE_ADDED);
      } else {
        this.toastr.error(PICTURE_NOT_ADDED);
      }
    });
  }

}
