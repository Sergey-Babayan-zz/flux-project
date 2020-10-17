import { AbstractControl, ValidationErrors } from '@angular/forms';

export class RequiredValidator {
  public static validate(c: AbstractControl): ValidationErrors {
    return RequiredValidator.isEmpty(c.value) ? {requiredValid: true} : null;
  }

  private static isEmpty(value): boolean {
    return value === undefined || value === null ||
      (typeof value === 'string' && value.trim().length === 0) || (Array.isArray(value) && value.length === 0);
  }
}
