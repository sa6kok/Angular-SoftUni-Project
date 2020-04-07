import { Pipe, PipeTransform, Inject } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { dateShowPipe } from './date-show';

@Pipe({
  name: 'dateShow'
})
export class DateShowPipe implements PipeTransform {

  transform(value: NgbDate): string {
    return dateShowPipe(value);
  }
}
