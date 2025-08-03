import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ApiResponse } from './models/api-response.model';

import { ApiError } from './models/api-error.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _http = inject(HttpClient);
  private _apiUrl = environment.apiBaseUrl; // Ex: 'http://localhost:3002'

  /**
   * Generic method for GET requests
   * @param endpoint Ex: 'bp/products'
   * @param params Query parameters optionals
   * @return Observable<T>
   */
  public get<T>(endpoint: string, params?: HttpParams, options?: { strict?: boolean }): Observable<T> {
    return this._http
      .get<ApiResponse<T>>(`${this._apiUrl}/${endpoint}`, { params })
      .pipe(
        map(response => this._normalizeResponse<T>(response, options?.strict)),
        catchError(this._handleError)
      );
  }

  /**
   * Generic method for POST requests
   * @param endpoint Ex: 'bp/products'
   * @param body Body of request
   * @param headers Custom headers optionals
   * @returns Observable<T>
   */
  public post<T>(endpoint: string, body: any, headers?: HttpHeaders, options?: { strict?: boolean }): Observable<T> {
    return this._http
      .post<ApiResponse<T>>(`${this._apiUrl}/${endpoint}`, body, { headers })
      .pipe(
        map(response => this._normalizeResponse<T>(response, options?.strict)),
        catchError(this._handleError)
      );
  }

      /**
   * Generic method for PUT requests
   * @param endpoint Ex: 'bp/products'
   * @param body Body of request
   * @param headers Custom headers optionals
   * @returns Observable<T>
   */
  public put<T>(endpoint: string, body: any, headers?: HttpHeaders, options?: { strict?: boolean }): Observable<T> {
    return this._http
      .put<ApiResponse<T>>(`${this._apiUrl}/${endpoint}`, body, { headers })
      .pipe(
        map(response => this._normalizeResponse<T>(response, options?.strict)),
        catchError(this._handleError)
      );
  }

  /**
   * Handles errors from API requests
   */
  private _handleError(error: any): Observable<never> {
    const apiError: ApiError = {
      status: error.status || 500,
      message: error.error?.message || 'Error desconocido',
      errors: error.error?.errors
    };
    console.error('API Error:', apiError);
    return throwError(() => apiError);
  }

  /**
   * Normalizes the response to a specific type
   * @param response The raw response from the API
   * @param strict If true, expects the response to have a 'data' property
   */
  private _normalizeResponse<T>(response: any, strict = true): T {
    // case 1: Response is a primitive type (string, number, etc.)
    if (typeof response !== 'object') {
      return response as T;
    }

    // case 2: Response is an object with a standard structure
    if (strict && 'data' in response) {
      return response.data as T;
    }

    // case 3: Response is an object without a 'data' property
    return response as T;
  }

}
