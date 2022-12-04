import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertService, ErrorAlert} from "../../services/alert.service";
import {MeetingService} from "../../services/meeting.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-select-meeting-page',
  templateUrl: './select-meeting-page.component.html',
  styleUrls: ['./select-meeting-page.component.less']
})
export class SelectMeetingPageComponent implements OnInit, OnDestroy {

  elements: { id: string, label: string }[] = [
    { id: "element_1", label: "Element 1" },
    { id: "element_2", label: "Element 2" },
    { id: "element_3", label: "Element 3" }
  ]

  private subs?: Subscription

  constructor(private alertService: AlertService, private meetingService: MeetingService) { }

  ngOnInit(): void {
    this.subs = this.meetingService.subject.subscribe((meetings) => {
      this.elements = meetings.map(v => {
        return { id: v.id, label: v.name }
      })
    })
    this.meetingService.fetchAll().then(() => {})
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe()
  }

  clicked(event: string) {
    console.log(event)
  }

}
