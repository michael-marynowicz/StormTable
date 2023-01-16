import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from "../services/user.service";
import {UserSessionService} from "../services/user-session.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  constructor(private userSessionService: UserSessionService, private router: Router) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    console.log(this.userSessionService.currentUser)
    if(!this.userSessionService.currentUser) {
      console.log(state.url)
      await this.router.navigate(['login'], { queryParams: { then: state.url }});
      return false;
    }
    return true;
  }

}
