import { DateValidators } from './date.validator';
import { AbstractControl } from '@angular/forms';

describe('DateValidators', () => {
  describe('minDate', () => {
    const min = new Date(2023, 0, 1); // Jan 1, 2023
    const validator = DateValidators.minDate(min);

    it('should return null if value is empty', () => {
      const control = { value: null } as AbstractControl;
      expect(validator(control)).toBeNull();
    });

    it('should return null if date is equal to minDate', () => {
      const control = { value: new Date(2023, 0, 1) } as AbstractControl;
      expect(validator(control)).toBeNull();
    });

    it('should return null if date is after minDate', () => {
      const control = { value: new Date(2023, 0, 2) } as AbstractControl;
      expect(validator(control)).toBeNull();
    });

    it('should return error if date is before minDate', () => {
      const control = { value: new Date(2022, 11, 31) } as AbstractControl;
      const result = validator(control);
      expect(result).toEqual({ minDate: { requiredDate: min } });
    });

    it('should work with string date values', () => {
      const control = { value: '2022-12-31' } as AbstractControl;
      const result = validator(control);
      expect(result).toEqual({ minDate: { requiredDate: min } });
    });
  });
});
