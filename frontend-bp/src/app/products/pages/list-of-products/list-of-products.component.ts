import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/ui/card/card.component';
import { ButtonComponent } from "../../../shared/ui/button/button.component";
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'products-list-of-products',
  imports: [
    CardComponent,
    ButtonComponent,
    InputComponent
],
  templateUrl: './list-of-products.component.html',
  styles: ``
})
export default class ListOfProductsComponent {

}
