import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
import { RouterModule } from '@angular/router';

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
  ],
  templateUrl: './list-of-products.component.html',
  styles: ``,
})
export default class ListOfProductsComponent implements OnInit {
  private readonly _productService = inject(ProductsService);
  private readonly _fb = inject(FormBuilder);
  public searchForm: FormGroup = this._fb.group({ search: [''] });

  public readonly title = 'Lista de Productos';
  public products = signal<Product[]>([]);
  public amountOfItems = signal<number>(5);
  public listOfPosibleAmountOfItems = signal<number[]>([5, 10, 15, 20]);
  public tableConfig = signal<TableConfig>({
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

  public handleAction(action: string, product: Product): void {
    switch (action) {
      case 'edit':
        console.log('Edit product:', product);
        break;
      case 'delete':
        console.log('Delete product:', product);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  public changeAmountOfItems(amount: number): void {
    this.amountOfItems.set(amount);
  }
}
