import { Component, inject } from '@angular/core';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { ToggleThemeButtonComponent } from '../../components/toggle-theme-button/toggle-theme-button.component';

@Component({
  selector: 'shared-layout-product-header',
  imports: [
    FontAwesomeModule,
    RouterModule,
    ToggleThemeButtonComponent
  ],
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.scss']
})
export class ProductHeaderComponent {
  public readonly faMoneyBill = faMoneyBill;
  private readonly _router = inject(Router);

  public redirectToProductos(): void {
    // Navigate to the products page
    this._router.navigate(['/products']);
  }
}
