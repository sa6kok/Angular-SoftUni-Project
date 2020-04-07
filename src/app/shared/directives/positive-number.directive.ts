import { Directive } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { positiveNumber } from './positive-number';

@Directive({
  selector: '[appPositiveNumber]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PositiveNumberDirective, multi: true }]
})
export class PositiveNumberDirective implements Validator  {

  validate(control: AbstractControl): ValidationErrors | null {
      return positiveNumber(control);
  }

}
