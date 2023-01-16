import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DirectoryService} from "../../../services/directory.service";
import {Subscription} from "rxjs";
import DirectoryModel from "../../../models/directory.model";
import DocumentModel from "../../../models/document.model";
import {DocumentService} from "../../../services/document.service";
import SessionService from "../../../services/session.service";

@Component({
  selector: 'app-directory-generator',
  templateUrl: './directory-generation.component.html',
  styleUrls: ['./directory-generation.component.less']
})
export class DirectoryGenerationComponent {

  directory: DirectoryModel[] = [];
  @Input() file!: DocumentModel;

  subs?: Subscription
  showAllDirectory: boolean = false;

  @Output() onSendToDirectory = new EventEmitter<string>();

  constructor(private directoryService: DirectoryService, private documentService: DocumentService, private sessionService:SessionService) {
    this.subs = directoryService.directory$.subscribe(directory => this.directory = directory)
  }

  createDirectory() {
    this.directoryService.createDirectory({
      x: this.file.position.x,
      y: this.file.position.y
    }, "#" + Math.floor(Math.random() * 16777215).toString(16), this.file)
    this.showAllDirectory = false;

  }

  sendToDirectory(directory: DirectoryModel) {
    this.documentService.moveFile(this.file, directory)
    this.showAllDirectory = false
  }

  getAllDirectory() : DirectoryModel[]{
    console.log(this.sessionService.getAllDirectory())
    return this.sessionService.getAllDirectory()
  }
}
