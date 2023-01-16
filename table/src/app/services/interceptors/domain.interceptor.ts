import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {serverDomain} from "../../../../domain.config";

@Injectable()
export class DomainInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Interceptor called.")
    const url = request.url.replace("{main}/", serverDomain + "/");
    console.log("Call urr: ", url);
    return next.handle(request.clone({
      url
    }));
  }
}
