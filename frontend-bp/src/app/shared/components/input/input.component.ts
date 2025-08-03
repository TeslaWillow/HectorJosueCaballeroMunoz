import {
  Component, forwardRef, booleanAttribute,
  ChangeDetectorRef, inject, input, model
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR, NG_VALIDATORS,
  ControlValueAccessor, Validator, AbstractControl,
  ValidationErrors, ReactiveFormsModule, FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

// Constants for ControlValueAccessor and Validator
// These constants are used to provide the component as a value accessor and validator in Angular forms
const INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};
// Validator for the input component
const INPUT_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: 'shared-component-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: [],
  providers: [INPUT_VALUE_ACCESSOR, INPUT_VALIDATOR]
})
export class InputComponent implements ControlValueAccessor, Validator {
  private _cdRef = inject(ChangeDetectorRef);

  // Inputs
  public readonly id = input<string>('');
  public readonly type = input<'text' | 'number' | 'email' | 'password' | 'date' | 'search' | 'textarea'>('text');
  public readonly placeholder = input<string>('');
  public readonly label = input<string>('');
  public readonly errorMessage = input<string>('');
  public readonly disabled = input<boolean, boolean>(false, { transform: booleanAttribute });
  public readonly readonly = input<boolean, boolean>(false, { transform: booleanAttribute });
  public readonly required = input<boolean, boolean>(false, { transform: booleanAttribute });
  public readonly min = input<number | string | null>(null);
  public readonly max = input<number | string | null>(null);

  // MODEL (Two-way data binding w/ signals)
  public value = model<any>('');

  // CONTROL VALUE ACCESSOR IMPLEMENTATION (Reactive Forms)
  public onChange: (value: any) => void = (() => {});
  public onTouched: () => void = (() => {});

  public writeValue(value: any): void {
    this.value.set(value);
    this._cdRef.markForCheck();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // VALIDATION
  public validate(control: AbstractControl): ValidationErrors | null {
    if (this.required() && !control.value) {
      return { required: true };
    }
    return null;
  }

  // HANDLERS
  public handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }

  public handleBlur(): void {
    this.onTouched();
  }

}
