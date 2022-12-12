import {Component} from '@angular/core';
import DocumentModel from "./models/document.model";
import {ElementType} from "./models/brainstorm-element.model";
import {Subscription} from "rxjs";
import {DocumentService} from "./services/document.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'table';

  doc : DocumentModel = {id:"1",name:"file-1670781299754.jpeg",type:ElementType.PICTURE,path:"files/file-1670781299754.jpeg"}

  allDocuments! : DocumentModel[]

  subs?: Subscription;

  constructor(documentService : DocumentService) {
    this.subs = documentService.files$.subscribe(file => this.allDocuments = file);
    documentService.fetchAllFiles();
  }
}
