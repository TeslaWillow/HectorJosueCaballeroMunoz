import { Routes } from '@angular/router';


export const productsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/list-of-products/list-of-products.component')
      },
      {
        path: 'editor',
        loadComponent: () => import('./pages/editor-of-products/editor-of-products.component')
      },
      {
        path: 'editor/:id',
        loadComponent: () => import('./pages/editor-of-products/editor-of-products.component')
      },
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
