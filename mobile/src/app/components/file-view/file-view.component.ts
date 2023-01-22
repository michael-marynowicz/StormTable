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

  directoryColor(document: DocumentModel) {
    return document.type === "DIRECTORY" ? document.color : undefined;
  }

  download(document: DocumentModel) {
    this.fileSelect.emit(document);
  }
}
