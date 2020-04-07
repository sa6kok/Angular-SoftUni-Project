import { AbstractControl, ValidationErrors } from '@angular/forms';

export function positiveNumber(c: AbstractControl): ValidationErrors {
  const price = c.value;
  return price > 0 ? null : {positiveNumber: true};
}
