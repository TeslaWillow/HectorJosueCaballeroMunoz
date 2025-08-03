import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class DateValidators {
  public static minDate(minDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const selectedDate = new Date(control.value);
      selectedDate.setHours(0, 0, 0, 0); // Normalize time to avoid time zone issues

      const today = new Date(minDate);
      today.setHours(0, 0, 0, 0);

      return selectedDate < today ? { minDate: { requiredDate: minDate } } : null;
    };
  }
}
