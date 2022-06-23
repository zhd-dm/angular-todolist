import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ValidateService } from '../services/validate.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private validateService: ValidateService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(requestError => {
        if(requestError.status !== 401) {
          const {error} = requestError;
          this.validateService.add({
            severity: 'error',
            summary: `HTTP Error - ${requestError.status}`,
            detail: error && error.message
          });
        }
        return throwError(() => new Error(requestError));
      })
    );
  }
}
