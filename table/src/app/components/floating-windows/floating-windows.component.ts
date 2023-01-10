import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-floating-windows',
  templateUrl: './floating-windows.component.html',
  styleUrls: ['./floating-windows.component.less']
})
export class FloatingWindowsComponent implements OnInit {

  @Output() clickOutside: EventEmitter<null> = new EventEmitter<null>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
