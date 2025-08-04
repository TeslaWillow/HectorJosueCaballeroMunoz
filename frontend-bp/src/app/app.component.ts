import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductHeaderComponent } from './shared/layout/product-header/product-header.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    ProductHeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'frontend-bp';
}
