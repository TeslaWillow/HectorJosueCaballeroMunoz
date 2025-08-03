import { Routes } from '@angular/router';
import { productsRoutes } from './modules/products/products.routes';

export const routes: Routes = [
  {
    path: 'productos',
    children: productsRoutes,
  },
  {
    path: '**',
    redirectTo: 'productos',
    pathMatch: 'full'
  }
];
