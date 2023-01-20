import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {MeetingService} from "../services/meeting.service";

@Injectable({
  providedIn: 'root'
})
export class IsInMeetingGuard implements CanActivate {

  constructor(private meetingService: MeetingService, private router: Router) {
  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if(!this.meetingService.isInMeeting()) {
      await this.router.navigate(['home'], { queryParams: { then: state.url }});
      return false;
    }
    return true;
  }

}
