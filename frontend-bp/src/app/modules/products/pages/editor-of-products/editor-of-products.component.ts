import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DateValidators } from '../../../../shared/validators/date.validator';
import { ProductMapper } from '../../mappers/product.mapper';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { ActivatedRoute, Router } from '@angular/router';

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
export default class EditorOfProductsComponent implements OnDestroy {
  public readonly title = 'Editor de Productos';
  public readonly today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  public readonly nextYear = new Date( new Date().setFullYear(new Date().getFullYear() + 1) ).toISOString().split('T')[0];

  private readonly _fb = inject(FormBuilder);
  private readonly _productService = inject(ProductsService);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  private _product = signal<Product | null>(null);
  public productForm!: FormGroup;
  public isLoading = signal<boolean>(false);

  // COMPUTED PROPERTIES
  public nextYearOfDateRevision = computed<string>(() => {
    const dateRevision = this.productForm.get('date_revision')?.value;

    if (!dateRevision) return '';

    const nextYearDate = new Date(dateRevision);
    nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
    return nextYearDate.toISOString().split('T')[0];
  });
  public isProductAvailable = computed<boolean>(() => {
    return this._product !== null;
  });

  constructor() {
    this._initializeForm();
    this._getProductIdFromUrl(); // Use then / catch to handle other cases depending if the product exists
  }

  // Cleanup logic
  ngOnDestroy(): void {
    this._product.set(null);
    this.isLoading.set(false);
    this.resetForm();
  }

  private _getProductIdFromUrl(): Promise<void> {
    const productId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    if (!productId) { return Promise.resolve(); }
    return new Promise((resolve, _) => {
      if (productId) {
        this._productService.getProductById(productId).subscribe({
          next: (product: Product) => {
            this._product.set(product);
            const mappedProduct = ProductMapper.fromDomainToForm(this._product()!);
            this.productForm.patchValue({
              ...mappedProduct,
              date_release: mappedProduct.date_release.toISOString()?.split('T')[0],
              date_revision: mappedProduct.date_revision.toISOString()?.split('T')[0],
            });
            this.productForm.get('id')?.disable();
            this.productForm.updateValueAndValidity();
            resolve();
          },
          error: (error) => {
            console.error('Error fetching product:', error);
            resolve();
          },
        });
      }
    });
  }

  private _initializeForm(): void {
    this.productForm = this._fb.group({
      id: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ]
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
      date_release: [this.today, [
        Validators.required,
        DateValidators.minDate(new Date(this.today)), // Ensure date_release is not in the past
      ]],
      date_revision: [this.nextYear, [
        Validators.required,
        DateValidators.minDate(new Date(this.nextYear)), // Ensure date_revision is at least one year after date_release
      ]],
    });

    this._registerFormChanges();
  }

  private _registerFormChanges(): void {
    // Set the next year to date_revision when the form is initialized
    this.productForm.get('date_release')?.valueChanges.subscribe(() => {
      this._setNextYearToDateRevision();
    });
  }

  private _setNextYearToDateRevision(): void {
    const dateReleaseControl = this.productForm.get('date_release');
    const dateRevisionControl = this.productForm.get('date_revision');

    if (!dateRevisionControl || !dateReleaseControl) return;

    const dateRelease = new Date(dateReleaseControl.value);
    const nextYearDate = new Date(dateRelease);
    nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);

    dateRevisionControl.setValue(nextYearDate.toISOString().split('T')[0]);

    // Update the minDate validator for date_revision
    dateRevisionControl.setValidators([
      Validators.required,
      DateValidators.minDate(nextYearDate),
    ]);
    dateRevisionControl.updateValueAndValidity();
  }

  private _saveProduct(): void {
    if(this.isLoading()) return;

    this.isLoading.set(true);
    const product: Product = ProductMapper.fromFormToDomain(this.productForm.value);
    this._productService.storeProduct(product).subscribe({
      next: (_: Product) => {
        this.resetForm();
        this._router.navigate(['/productos']);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error saving product:', error);
        this.isLoading.set(false);
      },
    });
  }

  private _updateProduct(): void {
    if(this.isLoading()) return;

    this.isLoading.set(true);
    const product: Product = ProductMapper.fromFormToDomain(this.productForm.value);
    this._productService.updateProduct(product).subscribe({
      next: (_: Product) => {
        this.resetForm();
        this._router.navigate(['/productos']);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error updating product:', error);
        this.isLoading.set(false);
      },
    });
  }

  public isInvalid(controlName: string): boolean {
    const control = this.productForm.get(controlName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  public onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    // If the product exists, update it
    if(this.isProductAvailable()){
      this._updateProduct();
      return;
    }

    // If the product don't exists, save it
    this._saveProduct();
  }

  public resetForm(): void {
    this.productForm.reset();
    this.productForm.patchValue({
      id: this.isProductAvailable() ? this._product()?.id : null,
      date_release: this.today,
      date_revision: this.nextYear,
    });
  }

}
