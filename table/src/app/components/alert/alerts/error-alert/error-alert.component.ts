import {Component, Input, OnInit} from '@angular/core';
import {AlertContent} from "../../../../services/alert.service";

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.less']
})
export class ErrorAlertComponent implements OnInit {
  @Input()
  alert!: AlertContent

  constructor() {
  }

  ngOnInit(): void {
  }

}
