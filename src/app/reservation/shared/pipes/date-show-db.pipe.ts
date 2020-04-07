import { Pipe, PipeTransform } from '@angular/core';
import { dateShowDb } from './date-show-db';

@Pipe({
  name: 'dateShowDb'
})
export class DateShowDbPipe implements PipeTransform {

  transform(value: string): string {
    return dateShowDb(value);
  }

}
