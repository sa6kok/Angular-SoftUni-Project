import { Component, Output, EventEmitter } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbd-datepicker-range',
  templateUrl: './ngbd-datepicker-range.component.html',
  styleUrls: ['./ngbd-datepicker-range.component.scss']
})
export class NgbdDatepickerRangeComponent {

  hoveredDate: NgbDate | null = null;

  minDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  @Output() selectCheckIn: EventEmitter<NgbDate> = new EventEmitter();
  @Output() selectCheckOut: EventEmitter<NgbDate> = new EventEmitter();

  constructor(calendar: NgbCalendar) {
    this.minDate = calendar.getToday();
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.selectCheckIn.emit(this.fromDate);
    this.selectCheckOut.emit(this.toDate);
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }


}
