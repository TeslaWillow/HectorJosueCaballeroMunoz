import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/http/api.service';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

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
    return this._api.get<Product[]>(`${this._endpoint}`);
  }

  /**
   * Fetches a product by its ID
   * @param id - The ID of the product to fetch
   * @returns Observable with the product
   */
  public getProductById(id: number): Observable<Product> {
    if (!id) {
      throw new Error('Product ID is required');
    }
    return this._api.get<Product>(`${this._endpoint}/${id}`);
  }

  /**
   * Search if the product exists by ID
   * @param id - The ID of the product to check
   * @returns Observable that says if the product exists
   */
  public checkIfProductsExists(id: number): Observable<Boolean> {
    if (!id) {
      throw new Error('Product ID is required for checking existence');
    }

    return this._api.get<Boolean>(`${this._endpoint}/verification/${id}`);
  }

  /**
   * Creates a new product
   * @param product - The product to create
   * @returns Observable with the product
   */
  public storeProduct(product: Product): Observable<Product> {
    return this._api.post<Product>(`${this._endpoint}`, product);
  }

  /**
   * Updates an existing product
   * @param product - The product to update
   * @returns Observable with the updated product
   */
  public updateProduct(product: Product): Observable<Product> {
    if (!product.id) {
      throw new Error('Product ID is required for update');
    }
    return this._api.put<Product>(`${this._endpoint}/${product.id}`, product);
  }

  /**
   * Deletes a product by ID
   * @param id - The ID of the product to delete
   * @returns Observable that completes when the product is deleted
   */
  public deleteProduct(id: number): Observable<void> {
    if (!id) {
      throw new Error('Product ID is required for deletion');
    }
    return this._api.delete<void>(`${this._endpoint}/${id}`);
  }

}
