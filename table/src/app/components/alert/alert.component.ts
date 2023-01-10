import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less']
})
export class AlertComponent implements OnInit {

  @Input() header!: string;
  @Input() content?: string;
  @Input() icon!: string;

  @Output() close: EventEmitter<null> = new EventEmitter<null>()

  constructor() {
  }

  ngOnInit(): void {
  }

}
