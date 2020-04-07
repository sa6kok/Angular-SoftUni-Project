import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { minAge } from './minAge';

@Directive({
  selector: '[appMinAge]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinAgeDirective, multi: true }]
})
export class MinAgeDirective implements Validator {

  validate(c: AbstractControl): ValidationErrors | null {
    return minAge(c);
  }

}
