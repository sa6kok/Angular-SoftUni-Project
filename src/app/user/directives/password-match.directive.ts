import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';
import { Directive } from '@angular/core';
import { passwordMatch } from './password-match';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[passwordMatch]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordMatchDirective, multi: true }]
})
export class PasswordMatchDirective implements Validator {

  validate(c: AbstractControl): ValidationErrors | null {
    return passwordMatch(c);
  }
}
