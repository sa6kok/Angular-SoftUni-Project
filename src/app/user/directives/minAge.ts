import { AbstractControl, ValidationErrors } from '@angular/forms';

export function minAge(c: AbstractControl): ValidationErrors {
  const age = c?.value;
  return  age >= 18 && age < 100 ? null : {minAge: true};
}
