import { Component, OnInit } from '@angular/core';
import {AlertService, ErrorAlert} from "../../services/alert.service";

@Component({
  selector: 'app-select-meeting-page',
  templateUrl: './select-meeting-page.component.html',
  styleUrls: ['./select-meeting-page.component.less']
})
export class SelectMeetingPageComponent implements OnInit {

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.alertService.showDialog(new ErrorAlert("Error !", "Table not found"))
    }, 2000)
  }

}
