import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';
import { TableComponent } from '../../../../shared/ui/table/table.component';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';
import { DropdownItemComponent } from '../../../../shared/components/dropdown-item/dropdown-item.component';
import { TableConfig } from '../../../../shared/ui/table/table.interface';

@Component({
  selector: 'products-list-of-products',
  imports: [
    CardComponent,
    ButtonComponent,
    InputComponent,
    TableComponent,
    DropdownComponent,
    DropdownItemComponent,
  ],
  templateUrl: './list-of-products.component.html',
  styles: ``,
})
export default class ListOfProductsComponent implements OnInit {
  private readonly _productService = inject(ProductsService);

  public readonly title = 'Lista de Productos';
  public products = signal<Product[]>([]);
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

  ngOnInit(): void {
    this._getProducts();
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
}
