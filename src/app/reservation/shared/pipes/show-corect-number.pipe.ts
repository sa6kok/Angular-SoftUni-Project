import { Pipe, PipeTransform } from '@angular/core';

const EMPTY_STRING = '';

@Pipe({
  name: 'showCorectNumber'
})
export class ShowCorectNumberPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) {
      return EMPTY_STRING;
    }
    return value.toString();
  }

}
