import { AbstractControl, ValidationErrors } from '@angular/forms';

export class EmailValidator {
  public static validate(c: AbstractControl): ValidationErrors {
    // tslint:disable-next-line: max-line-length
    const emailRegexp = /^[^<>()[\]\\,;:\%#^\s@\"$&№*/~{}'|`+=!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (c.value && c.value.trim()) {
      return emailRegexp.test(c.value) ? null : {emailValid: true};
    }
    return null;
  }
}
