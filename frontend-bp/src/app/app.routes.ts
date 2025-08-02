import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'productos',
    loadComponent: () => import('./products/pages/list-of-products/list-of-products.component'),
  },
  {
    path: 'productos/editor',
    loadComponent: () => import('./products/pages/editor-of-products/editor-of-products.component'),
  },
  {
    path: 'productos/editor/:id',
    loadComponent: () => import('./products/pages/editor-of-products/editor-of-products.component'),
  },
  {
    path: '**',
    redirectTo: 'productos',
    pathMatch: 'full'
  }
];
