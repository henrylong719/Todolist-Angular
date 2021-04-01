import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // take(1): only take once then unsubscribe()
    // exhaustMap (makes the call and ignores any new request until the previous call comes back)
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }

        const authRequest = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + user.token),
        });

        return next.handle(authRequest);
      })
    );
  }
}
