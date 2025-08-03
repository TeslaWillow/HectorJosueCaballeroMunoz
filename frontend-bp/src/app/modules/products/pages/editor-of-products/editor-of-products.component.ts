import { Component, computed, inject } from '@angular/core';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'products-editor-of-products',
  imports: [
    CardComponent,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './editor-of-products.component.html',
  styles: ``,
})
export default class EditorOfProductsComponent {
  public readonly title = 'Editor de Productos';
  public readonly today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  public readonly nextYear = new Date( new Date().setFullYear(new Date().getFullYear() + 1) ).toISOString().split('T')[0];

  private _fb = inject(FormBuilder);

  public productForm!: FormGroup;
  public nextYearOfDateRevision = computed<string>(() => {
    const dateRevision = this.productForm.get('date_revision')?.value;

    if (!dateRevision) return '';

    const nextYearDate = new Date(dateRevision);
    nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
    return nextYearDate.toISOString().split('T')[0];
  });

  constructor() {
    this._initializeForm();
  }

  private _initializeForm(): void {
    this.productForm = this._fb.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', [Validators.required]],
      date_release: [this.today, [Validators.required]],
      date_revision: [this.nextYear, [Validators.required]],
    });

    this._registerFormChanges();
  }

  private _registerFormChanges(): void {
    // Prevent past dates for date_release
    this.productForm.get('date_release')?.valueChanges.subscribe(() => {
      this._dontAllowPastReleaseDate();
    });

    // Set the next year to date_revision when the form is initialized
    this.productForm.get('date_release')?.valueChanges.subscribe(() => {
      this._setNextYearToDateRevision();
    });
  }

  private _dontAllowPastReleaseDate(): void {
    const dateReleaseControl = this.productForm.get('date_release');
    if (!dateReleaseControl) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateRelease = new Date(dateReleaseControl.value);
    dateRelease.setHours(0, 0, 0, 0);

    if (dateRelease >= today) return;
    dateReleaseControl.setValue(today.toISOString().split('T')[0]);
  }

  private _setNextYearToDateRevision(): void {
    const dateReleaseControl = this.productForm.get('date_release');
    const dateRevisionControl = this.productForm.get('date_revision');

    if (!dateRevisionControl || !dateReleaseControl) return;

    const currentDate = new Date(dateReleaseControl.value);
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    dateRevisionControl.setValue(currentDate.toISOString().split('T')[0]);
  }

  public isInvalid(controlName: string): boolean {
    const control = this.productForm.get(controlName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  public resetForm(): void {
    this.productForm.reset();
    this.productForm.patchValue({
      date_release: this.today,
      date_revision: this.nextYear,
    });
  }

}
