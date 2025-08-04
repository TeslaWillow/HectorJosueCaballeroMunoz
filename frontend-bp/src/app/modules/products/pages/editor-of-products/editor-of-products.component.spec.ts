import { ProductMapper } from '../../mappers/product.mapper';
import { of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import EditorOfProductsComponent from './editor-of-products.component';

describe('EditorOfProductsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EditorOfProductsComponent,
        CardComponent,
        ButtonComponent,
        InputComponent,
        ReactiveFormsModule
      ],
      providers: [
        provideHttpClient(), // HttpClient for service injection
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => undefined } } } },
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    });
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(EditorOfProductsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const fixture = TestBed.createComponent(EditorOfProductsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.productForm).toBeDefined();
    expect(component.productForm.get('id')?.value).toBe('');
    expect(component.productForm.get('date_release')?.value).toBe(component.today);
    expect(component.productForm.get('date_revision')?.value).toBe(component.nextYear);
  });

  it('should mark all controls as touched if form is invalid on submit', () => {
    const fixture = TestBed.createComponent(EditorOfProductsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const markAllAsTouchedSpy = jest.spyOn(component.productForm, 'markAllAsTouched');
    component.productForm.get('name')?.setValue(''); // Make form invalid
    component.onSubmit();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });
});

// Unit tests for save and update functionality
describe('EditorOfProductsComponent (unit for save and update)', () => {
  let component: any;
  let productsServiceMock: any;
  let routerMock: any;
  let productFormMock: any;
  let isLoadingSignal: any;

  beforeEach(() => {
    productsServiceMock = {
      storeProduct: jest.fn().mockReturnValue(of({})),
      updateProduct: jest.fn().mockReturnValue(of({}))
    };
    routerMock = { navigate: jest.fn() };
    isLoadingSignal = jest.fn(() => false);
    isLoadingSignal.set = jest.fn();
    productFormMock = {
      value: { id: 1, name: 'A', description: 'D', logo: '', date_release: new Date('2024-01-01'), date_revision: new Date('2025-01-01') },
      getRawValue: jest.fn().mockReturnValue({ id: 1, name: 'A', description: 'D', logo: '', date_release: new Date('2024-01-01'), date_revision: new Date('2025-01-01') })
    };
    component = Object.create(EditorOfProductsComponent.prototype);
    component._productService = productsServiceMock;
    component._router = routerMock;
    component.isLoading = isLoadingSignal;
    component.productForm = productFormMock;
    component.resetForm = jest.fn();
    jest.spyOn(ProductMapper, 'fromFormToDomain').mockReturnValue(productFormMock.value);
  });

  it('should call storeProduct and handle success in _saveProduct', () => {
    component._saveProduct();
    expect(productsServiceMock.storeProduct).toHaveBeenCalledWith(productFormMock.value);
    expect(component.resetForm).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/productos']);
    expect(isLoadingSignal.set).toHaveBeenCalledWith(false);
  });

  it('should handle error in _saveProduct', () => {
    productsServiceMock.storeProduct.mockReturnValueOnce(throwError(() => new Error('fail')));
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    component._saveProduct();
    expect(productsServiceMock.storeProduct).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith('Error saving product:', expect.any(Error));
    expect(isLoadingSignal.set).toHaveBeenCalledWith(false);
    errorSpy.mockRestore();
  });

  it('should call updateProduct and handle success in _updateProduct', () => {
    component._updateProduct();
    expect(productsServiceMock.updateProduct).toHaveBeenCalledWith(productFormMock.value);
    expect(component.resetForm).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/productos']);
    expect(isLoadingSignal.set).toHaveBeenCalledWith(false);
  });

  it('should handle error in _updateProduct', () => {
    productsServiceMock.updateProduct.mockReturnValueOnce(throwError(() => new Error('fail')));
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    component._updateProduct();
    expect(productsServiceMock.updateProduct).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith('Error updating product:', expect.any(Error));
    expect(isLoadingSignal.set).toHaveBeenCalledWith(false);
    errorSpy.mockRestore();
  });
});
