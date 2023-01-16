import {Component, Input} from '@angular/core';
import DirectoryModel from "../../models/directory.model";
import DocumentModel from "../../models/document.model";

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
  get getDirectory(){
    return this.directory as DirectoryModel
  }

  get printFiles(){
    this.wantFiles = this.wantFiles && !this.miniMap
    return this.wantFiles
  }


}
