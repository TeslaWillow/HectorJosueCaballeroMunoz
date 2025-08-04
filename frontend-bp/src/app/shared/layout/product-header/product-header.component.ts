import { Component } from '@angular/core';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'shared-layout-product-header',
  imports: [
    FontAwesomeModule,
  ],
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.scss']
})
export class ProductHeaderComponent {
  faMoneyBill = faMoneyBill;
}
