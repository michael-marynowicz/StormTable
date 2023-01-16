import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {serverHostname} from "./host.config";


@Injectable()
export class DomainInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let domain: string|undefined = undefined;
    if(request.url.startsWith("{main}/"))
      domain = serverHostname;

    if(!domain)
      throw "Domain not know.";

    const req = request.clone({
      url: domain + request.url.substring(request.url.indexOf("/"))
    })

    return next.handle(req);
  }
}
