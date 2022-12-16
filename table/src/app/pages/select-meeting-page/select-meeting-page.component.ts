import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertService, ErrorAlert} from "../../services/alert.service";
import {Subscription} from "rxjs";
import {MeetingModel} from "../../models/meeting.model";
import {MeetingService} from "../../services/meeting.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-meeting-page',
  templateUrl: './select-meeting-page.component.html',
  styleUrls: ['./select-meeting-page.component.less']
})
export class SelectMeetingPageComponent implements OnInit, OnDestroy {

  meetings?: MeetingModel[];

  get elements() {
    return this.meetings?.map(e => {
      return {
        id: e.id,
        label: e.name
      }
    }) || []
  }

  private subs?: Subscription

  constructor(
    private alertService: AlertService,
    private meetingService: MeetingService,
    private navigator: Router) { }

  ngOnInit(): void {
    this.meetingService.getMeetings().then(meetings => this.meetings = meetings);
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe()
  }

  clicked(event: string) {
    console.log(event)
    this.navigator.navigate(["meeting", event])
  }

}
