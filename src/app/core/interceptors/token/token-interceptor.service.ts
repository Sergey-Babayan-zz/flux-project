import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@core/services';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  // private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
  //   return req.clone({setHeaders: {Authorization: 'Bearer ' + token}});
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = this.authService.accessToken;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse ) => {
          switch (error.status) {
            case 401:
              this.authService.logout();
              break;
            default:
              return throwError(error);
            }
        }));
  }

}
