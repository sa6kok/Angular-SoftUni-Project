import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDesc'
})
export class ShortDescPipe implements PipeTransform {

  transform(value: string): string {
    return value?.length > 75 ? `${value.substring(0, 75)}...` : value ;
  }

}
