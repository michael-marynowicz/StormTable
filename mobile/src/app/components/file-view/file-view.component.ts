import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DocumentModel} from "../../models/document.model";

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.less']
})
export class FileViewComponent {
  @Input() documents!: DocumentModel[];
  @Output() fileSelect: EventEmitter<DocumentModel> = new EventEmitter<DocumentModel>();
}
