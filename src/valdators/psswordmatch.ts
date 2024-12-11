import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatch(pwd: string, cpwd: string): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const passwordValue = form.get(pwd)?.value;
    const confirmPassValue = form.get(cpwd)?.value;

    if (passwordValue === confirmPassValue) {
      return null;
    }
    return { passwordMismatchError: true };
  };
}
