import {Component, OnInit} from '@angular/core';
import {DocumentModel} from "../../models/document.model";
import {MeetingService} from "../../services/meeting.service";
import {ActivatedRoute} from "@angular/router";
import {MeetingModel} from "../../models/meeting.model";

@Component({
  selector: 'app-meeting-page',
  templateUrl: './meeting-page.component.html',
  styleUrls: ['./meeting-page.component.less']
})
export class MeetingPageComponent implements OnInit{
  meeting?: MeetingModel;
  meetingId!: string;

  constructor(private meetingService: MeetingService, private aroute: ActivatedRoute) {
    aroute.params.subscribe(_ => {
      const meetingId = aroute.snapshot.paramMap.get('meetingId');
      if(!meetingId)
        throw "Meeting id not found."
      this.meetingId = meetingId;
    })
  }

  ngOnInit(): void {
    this.meetingService.getMeeting(this.meetingId).then(meeting => this.meeting = meeting);
  }
}
