import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/http/api.service';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';
import { Observable, of } from 'rxjs';
import { Product } from '../interfaces/product.interface';

const data: Product[] = [
        {
            "id": 2,
            "name": "Producto 2",
            "description": "Descripción de producto",
            "logo": "assets-2.png",
            "date_release": new Date("2025-01-01"),
            "date_revision": new Date("2025-01-01")
        },
        {
            "id": 3,
            "name": "Producto 3",
            "description": "Descripción de producto",
            "logo": "assets-3.png",
            "date_release": new Date("2025-01-01"),
            "date_revision": new Date("2025-01-01")
        },
        {
            "id": 4,
            "name": "Producto 4",
            "description": "Descripción de producto",
            "logo": "assets-4.png",
            "date_release": new Date("2025-01-01"),
            "date_revision": new Date("2025-01-01")
        },
        {
            "id": 5,
            "name": "Producto 5",
            "description": "Descripción de producto",
            "logo": "assets-5.png",
            "date_release": new Date("2025-01-01"),
            "date_revision": new Date("2025-01-01")
        },
        {
            "id": 6,
            "name": "Producto 6",
            "description": "Descripción de producto",
            "logo": "assets-6.png",
            "date_release": new Date("2025-01-01"),
            "date_revision": new Date("2025-01-01")
        },
        {
            "id": 1,
            "name": "Producto 1",
            "description": "Descripción de producto",
            "logo": "assets-1.png",
            "date_release": new Date("2025-01-01"),
            "date_revision": new Date("2025-01-01")
        }
    ];

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _api = inject(ApiService);
  private _endpoint = API_ENDPOINTS.PRODUCTS;

  /**
   * Fetches the list of products
   * @returns Observable with the list of products
   */
  public getProducts(): Observable<Product[]> {
    return of(data);
    return this._api.get<Product[]>(`${this._endpoint}`);
  }

  public storeProduct(product: Product): Observable<Product> {
    return this._api.post<Product>(`${this._endpoint}`, product);
  }

}
