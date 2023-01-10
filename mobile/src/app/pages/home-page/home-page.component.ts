import {Component, OnInit} from '@angular/core';
import {MeetingModel} from "../../models/meeting.model";
import {MeetingService} from "../../services/meeting.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {
  meeting?: MeetingModel;

  constructor(private meetingService: MeetingService) {
  }

  ngOnInit(): void {
    this.meetingService.getCurrentMeeting().then(meeting => this.meeting = meeting)
  }


}
