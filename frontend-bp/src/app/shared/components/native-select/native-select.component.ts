import { Component, input, model, booleanAttribute, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, NG_VALIDATORS } from '@angular/forms';

// These constants are used to provide the component as a value accessor and validator in Angular forms
const INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NativeSelectComponent),
  multi: true
};
// Validator for the input component
const INPUT_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => NativeSelectComponent),
  multi: true
};

@Component({
  selector: 'ui-native-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './native-select.component.html',
  styleUrls: [],
  providers: [ INPUT_VALUE_ACCESSOR, INPUT_VALIDATOR ]
})
export class NativeSelectComponent implements ControlValueAccessor {
  // Inputs
  public readonly label = input<string>('');
  public readonly options = input<{value: any, label: string}[]>([]);
  public readonly placeholder = input<string>('--Select--');
  public readonly disabled = input<boolean, boolean>(false, { transform: booleanAttribute });
  public readonly required = input<boolean, boolean>(false, { transform: booleanAttribute });
  public readonly errorMessage = input<string>('');

  // Two-way binding
  public value = model<any>();

  // ControlValueAccessor
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  public writeValue(value: any): void {
    this.value.set(value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public handleChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }

}
