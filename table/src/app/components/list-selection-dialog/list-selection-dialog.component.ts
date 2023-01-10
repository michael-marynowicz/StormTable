import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list-selection-dialog',
  templateUrl: './list-selection-dialog.component.html',
  styleUrls: ['./list-selection-dialog.component.less']
})
export class ListSelectionDialogComponent implements OnInit {

  @Input() header!: string;
  @Input() elements: { id: string, label: string }[] = []
  @Output() elementClicked = new EventEmitter<string>()

  constructor() {
  }

  ngOnInit(): void {
  }

}
