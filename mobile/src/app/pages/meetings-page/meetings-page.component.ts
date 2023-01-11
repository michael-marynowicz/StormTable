import {Component, OnInit} from '@angular/core';
import {MeetingModel} from "../../models/meeting.model";
import {MeetingService} from "../../services/meeting.service";

@Component({
  selector: 'app-meetings-page',
  templateUrl: './meetings-page.component.html',
  styleUrls: ['./meetings-page.component.less']
})
export class MeetingsPageComponent implements OnInit {
  meetings?: MeetingModel[];

  constructor(private meetingService: MeetingService) {
  }

  ngOnInit(): void {
    this.meetingService.getImplications().then(meetings => this.meetings = meetings);
  }


}
