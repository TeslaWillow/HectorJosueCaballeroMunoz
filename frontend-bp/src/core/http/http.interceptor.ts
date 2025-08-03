import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';


// Context token to bypass authentication for specific requests
export const BYPASS_AUTH = new HttpContextToken(() => false);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private _token = 'your-auth-token'; // Replace with actual token retrieval logic

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    // Request bypass logic (example: for public APIs, login)
    if (request.context.get(BYPASS_AUTH)) {
      return next.handle(request);
    }

    // Clone the request and add the authorization header
    const authReq = request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${this._token}`)
        .set('Content-Type', 'application/json')
    });

    return next.handle(authReq); // Pass the cloned request instead of the original
  }

}
