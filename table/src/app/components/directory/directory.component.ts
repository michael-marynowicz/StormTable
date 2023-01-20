import {Component, Input} from '@angular/core';
import DirectoryModel from "../../models/directory.model";
import DocumentModel from "../../models/document.model";
import SessionService from "../../services/session.service";

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.less']
})
export class DirectoryComponent{
  @Input() color!: string
  @Input() directory!: DocumentModel
  @Input() miniMap!: boolean
  wantFiles:boolean=false;

  constructor(private sessionService:SessionService) {
  }
  get getDirectory(){
    return this.directory as DirectoryModel
  }

  get getFiles() {
    const directory = this.sessionService.session?.meeting.meeting.documents.find(doc =>doc.id===this.directory.id) as DirectoryModel
    return directory.files
  }

}
