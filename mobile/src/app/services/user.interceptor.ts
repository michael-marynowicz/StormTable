import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from "./user.service";

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userId = this.userService.currentUser?.id;
    if(!userId) return next.handle(request);


    return next.handle(request.clone({
      setHeaders: {
        user: userId
      }
    }));
  }
}
