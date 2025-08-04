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
