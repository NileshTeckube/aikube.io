import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import {TokenService } from './token.service'
@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private tokenservice:TokenService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith('/login')) {
      return next.handle(request);
    }

    if (this.tokenservice.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.tokenservice.token}`,
        },
      });
    }
    return next.handle(request);
  }

}
