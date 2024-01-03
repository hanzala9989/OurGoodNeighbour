import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('access_token'); // Modify this based on your token storage method.

    if (token) {
      // Clone the request and add the Authorization header.
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.loadingService.showLoading(); // Show the loading indicator when making the request.

      return next.handle(cloned).pipe(
        finalize(() => {
          this.loadingService.hideLoading(); // Hide the loading indicator when the request is complete.
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
