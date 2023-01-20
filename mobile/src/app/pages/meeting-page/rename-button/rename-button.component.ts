import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-rename-button',
  templateUrl: './rename-button.component.html',
  styleUrls: ['./rename-button.component.less']
})
export class RenameButtonComponent {
  @Input() name!: string;
  @Output() rename = new EventEmitter<string>();


  isValid(value: string) {
    return value.length > 0 && !!value.match(/^[a-zA-Z0-9\-]*$/gm);
  }
}
