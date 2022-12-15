import {Component, OnInit} from '@angular/core';
import DocumentModel from "./models/document.model";
import {Subscription} from "rxjs";
import {DocumentService} from "./services/document.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'table';

  allDocuments! : DocumentModel[]

  subs?: Subscription;

  constructor(private documentService : DocumentService) {
    this.subs = documentService.files$.subscribe(file => this.allDocuments = file);
    console.log("first")
    documentService.fetchAllFiles();
  }

  ngOnInit(): void {
    this.allDocuments = this.documentService.files;
  }
}
