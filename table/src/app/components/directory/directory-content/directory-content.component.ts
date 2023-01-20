import {Component, EventEmitter, Input, Output} from '@angular/core';
import DirectoryModel from "../../../models/directory.model";
import DocumentModel from "../../../models/document.model";
import {DirectoryService} from "../../../services/directory.service";
import SessionService from "../../../services/session.service";
@Component({
  selector: 'app-directory-content',
  templateUrl: './directory-content.component.html',
  styleUrls: ['./directory-content.component.less']
})
export class DirectoryContentComponent {
  @Input() directory!: DirectoryModel

  @Output() close = new EventEmitter<string>();
  constructor(private sessionService: SessionService,private directoryService: DirectoryService) {
  }

  uploadFile(file: DocumentModel) {
    this.directoryService.uploadFile(file, this.directory)
  }

  get getFiles() {
    const directory = this.sessionService.session?.meeting.meeting.documents.find(doc =>doc.id===this.directory.id) as DirectoryModel
    return directory.files
  }
}
