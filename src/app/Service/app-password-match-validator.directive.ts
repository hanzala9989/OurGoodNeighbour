import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatchValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AppPasswordMatchValidatorDirective, multi: true }]
})
export class AppPasswordMatchValidatorDirective {

  @Input('appPasswordMatchValidator') password: string | undefined;

  validate(control: AbstractControl): ValidationErrors | null {
    const confirmPassword = control.value;

    if (this.password !== confirmPassword) {
      return { passwordMatch: false };
    }

    return null;
  }
}
