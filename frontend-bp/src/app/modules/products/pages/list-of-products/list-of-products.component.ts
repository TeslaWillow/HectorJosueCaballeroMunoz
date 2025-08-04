import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';
import { TableComponent } from '../../../../shared/ui/table/table.component';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';
import { DropdownItemComponent } from '../../../../shared/components/dropdown-item/dropdown-item.component';
import { TableConfig } from '../../../../shared/ui/table/table.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

@Component({
  selector: 'products-list-of-products',
  imports: [
    CardComponent,
    ButtonComponent,
    InputComponent,
    TableComponent,
    DropdownComponent,
    DropdownItemComponent,
    ReactiveFormsModule,
    RouterModule,
    ModalComponent,
  ],
  templateUrl: './list-of-products.component.html',
  styles: ``,
})
export default class ListOfProductsComponent implements OnInit, OnDestroy {
  private readonly _productService = inject(ProductsService);
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);

  public readonly title = 'Lista de Productos';
  public readonly searchForm: FormGroup = this._fb.group({ search: [''] });
  public readonly products = signal<Product[]>([]);
  public readonly selectedProduct = signal<Product | null>(null);
  public readonly amountOfItems = signal<number>(5);
  public readonly listOfPosibleAmountOfItems = signal<number[]>([5, 10, 15, 20]);
  public readonly modalIsOpen = signal<boolean>(false);
  public readonly isDeletingProduct = signal<boolean>(false);
  public readonly tableConfig = signal<TableConfig>({
    columns: [
      { key: 'name', label: 'Nombre' },
      { key: 'description', label: 'Descripción' },
      { key: 'date_release', label: 'Fecha de Liberación' },
      { key: 'date_revision', label: 'Fecha de Revisión' },
    ],
    striped: false,
    hoverable: false,
  });
  public readonly searchTerm = signal('');
  public readonly debouncedSearchTerm = signal('');
  // COMPUTED
  public readonly visibleProducts = computed(() => {
    const search = this.debouncedSearchTerm().toLowerCase().trim();
    let filtered = this.products();
    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      );
    }
    return filtered.slice(0, this.amountOfItems());
  });

  ngOnInit(): void {
    this._getProducts();
    // Debounce
    this._initDebouncedSearch();
  }

  // Cleanup logic
  ngOnDestroy(): void {
    this.closeModal();
    this.isDeletingProduct.set(false);
  }

  private _initDebouncedSearch(): void {
    this.searchForm.get('search')!.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        this.debouncedSearchTerm.set(value || '');
      });
  }

  private _getProducts(): void {
    this._productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products.set(products);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  public deleteProduct(): void {
    if( this.isDeletingProduct() ) return;

    this.isDeletingProduct.set(true);
    this._productService.deleteProduct( +this.selectedProduct()!.id ).subscribe({
      next: ()  => {
        this.products.set(this.products().filter(product => product.id !== this.selectedProduct()?.id));
        this.closeModal();
        this.isDeletingProduct.set(false);
      },
      error: (error) => {
        console.error('Error deleting product:', error);
        this.isDeletingProduct.set(false);
      }
    });
  }

  public handleAction(action: string, product: Product): void {
    switch (action) {
      case 'edit':
        if (!product.id) return;
        this._router.navigate(['/productos/editor', product.id]);
        break;
      case 'delete':
        if (!product.id) return;
        this.selectedProduct.set(product);
        this.modalIsOpen.set(true);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  public changeAmountOfItems(amount: number): void { this.amountOfItems.set(amount); }

  public closeModal(): void {
    this.modalIsOpen.set(false);
    this.selectedProduct.set(null);
  }

}
