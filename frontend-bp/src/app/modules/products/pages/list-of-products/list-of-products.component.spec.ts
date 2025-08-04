import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { TableComponent } from '../../../../shared/ui/table/table.component';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';
import { DropdownItemComponent } from '../../../../shared/components/dropdown-item/dropdown-item.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import ListOfProductsComponent from './list-of-products.component';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';

describe('ListOfProductsComponent', () => {
  let productsServiceMock: any;
  let routerMock: any;
  let formBuilder: FormBuilder;
  const mockProducts: Product[] = [
    { id: 1, name: 'A', description: 'Desc A', logo: '', date_release: new Date('2024-01-01'), date_revision: new Date('2025-01-01') },
    { id: 2, name: 'B', description: 'Desc B', logo: '', date_release: new Date('2024-02-01'), date_revision: new Date('2025-02-01') }
  ];

  beforeEach(() => {
    productsServiceMock = {
      getProducts: jest.fn().mockReturnValue(of(mockProducts)),
      deleteProduct: jest.fn().mockReturnValue(of({}))
    };
    routerMock = { navigate: jest.fn() };
    formBuilder = new FormBuilder();

    TestBed.configureTestingModule({
      imports: [
        ListOfProductsComponent,
        CardComponent,
        ButtonComponent,
        InputComponent,
        TableComponent,
        DropdownComponent,
        DropdownItemComponent,
        ModalComponent,
        ReactiveFormsModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => undefined } } } },
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: FormBuilder, useValue: formBuilder }
      ]
    });
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ListOfProductsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should fetch products on init', () => {
    const fixture = TestBed.createComponent(ListOfProductsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(productsServiceMock.getProducts).toHaveBeenCalled();
    expect(component.products()).toEqual(mockProducts);
  });

  it('should debounce search input', fakeAsync(() => {
    const fixture = TestBed.createComponent(ListOfProductsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const searchControl = component.searchForm.get('search');
    searchControl!.setValue('test');
    tick(999);
    expect(component.debouncedSearchTerm()).toBe('');
    tick(1);
    expect(component.debouncedSearchTerm()).toBe('test');
  }));

  it('should handle deleteProduct success', () => {
    const fixture = TestBed.createComponent(ListOfProductsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    component.selectedProduct.set(mockProducts[0]);
    component.deleteProduct();
    expect(productsServiceMock.deleteProduct).toHaveBeenCalledWith(1);
    expect(component.products().find(p => p.id === 1)).toBeUndefined();
    expect(component.modalIsOpen()).toBe(false);
    expect(component.isDeletingProduct()).toBe(false);
  });

  it('should handle deleteProduct error', () => {
    productsServiceMock.deleteProduct.mockReturnValueOnce(throwError(() => new Error('fail')));
    const fixture = TestBed.createComponent(ListOfProductsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    component.selectedProduct.set(mockProducts[0]);
    component.deleteProduct();
    expect(component.isDeletingProduct()).toBe(false);
  });

  it('should handle handleAction edit', () => {
    const fixture = TestBed.createComponent(ListOfProductsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    component.handleAction('edit', mockProducts[0]);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/productos/editor', 1]);
  });

  it('should handle handleAction delete', () => {
    const fixture = TestBed.createComponent(ListOfProductsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    component.handleAction('delete', mockProducts[0]);
    expect(component.selectedProduct()).toEqual(mockProducts[0]);
    expect(component.modalIsOpen()).toBe(true);
  });

  it('should handle handleAction unknown', () => {
    const fixture = TestBed.createComponent(ListOfProductsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    component.handleAction('unknown', mockProducts[0]);
    expect(warnSpy).toHaveBeenCalledWith('Unknown action:', 'unknown');
    warnSpy.mockRestore();
  });

  it('should change amount of items', () => {
    const fixture = TestBed.createComponent(ListOfProductsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    component.changeAmountOfItems(10);
    expect(component.amountOfItems()).toBe(10);
  });

  it('should close modal', () => {
    const fixture = TestBed.createComponent(ListOfProductsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    component.selectedProduct.set(mockProducts[0]);
    component.modalIsOpen.set(true);
    component.closeModal();
    expect(component.modalIsOpen()).toBe(false);
    expect(component.selectedProduct()).toBeNull();
  });
});
