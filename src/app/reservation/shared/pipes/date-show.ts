import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export function dateShowPipe(value: NgbDate) {
  if (value?.day === undefined ) {
    return '';
  }
  return `${value?.day > 9 ? value?.day : `0${value?.day}`}.${value?.month > 9 ? value?.month : `0${value?.month}`}.${value?.year}`;
}


