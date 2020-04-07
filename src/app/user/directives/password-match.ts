import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatch(c: AbstractControl): ValidationErrors {
  return c.value.password === c.value.confirmPassword ? null : { passwordMatch: true };
}
