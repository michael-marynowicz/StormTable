import {Component, Input, OnInit} from '@angular/core';
import {MeetingService} from "../../services/meeting.service";

export interface NavigationElement {
  label: string;
  disabled: boolean;
  link?: string;
  clicked?: () => void;
  active?: boolean;
}

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.less']
})
export class PageLayoutComponent implements OnInit {
  @Input() menuItems: NavigationElement[] = [
    {
      label: 'Home',
      disabled: false,
      link: '/home'
    }, {
      label: 'Files',
      disabled: false,
      link: '/files'
    }, {
      label: 'Meetings',
      disabled: false,
      link: '/meetings'
    }
  ];

  alert?: string;

  @Input() page?: string;

  constructor(private meetingService: MeetingService) {
  }

  ngOnInit(): void {
    this.meetingService.getCurrentMeeting().then((meeting) => {
      if (meeting) {
        this.alert = `You are in meeting ${meeting.name}`;
      }
    })
  }
}
