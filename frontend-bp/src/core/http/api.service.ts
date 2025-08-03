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
  public get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this._http
      .get<ApiResponse<T>>(`${this._apiUrl}/${endpoint}`, { params })
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Generic method for POST requests
   * @param endpoint Ex: 'bp/products'
   * @param body Body of request
   * @param headers Custom headers optionals
   * @returns Observable<T>
   */
  public post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this._http
      .post<ApiResponse<T>>(`${this._apiUrl}/${endpoint}`, body, { headers })
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Handles errors from API requests
   */
  private handleError(error: any): Observable<never> {
    const apiError: ApiError = {
      status: error.status || 500,
      message: error.error?.message || 'Error desconocido',
      errors: error.error?.errors
    };
    console.error('API Error:', apiError);
    return throwError(() => apiError);
  }

}
