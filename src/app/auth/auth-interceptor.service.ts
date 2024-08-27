import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService : AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user2.pipe(take(1), exhaustMap((user) =>{
      if(!user){
        return next.handle(req);
      }
      const modifiedRequest = req.clone(
        {
          params: new HttpParams().set('login',user.getToken())
        }
      )
      return next.handle(modifiedRequest);
    }))
  }
}
