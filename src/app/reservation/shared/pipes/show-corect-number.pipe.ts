import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showCorectNumber'
})
export class ShowCorectNumberPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) {
      return '';
    }
    return value.toString();
  }

}
