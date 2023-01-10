import { Component } from '@angular/core';
import {DirectoryService} from "../../../services/directory.service";
import DocumentModel from "../../../models/document.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.less']
})
export class DirectoryComponent {

  directory: DocumentModel[] = []

  subs?: Subscription
  showAllDirectory: boolean =false;

  constructor(private directoryService : DirectoryService) {
    this.subs = directoryService.directory$.subscribe(directory => this.directory=directory)
  }

  createDirectory($event: MouseEvent) {
    this.directoryService.createDirectory({x:$event.clientX,y:$event.clientY},"#"+Math.floor(Math.random()*16777215).toString(16))
    this.showAllDirectory=false;

  }

  openDirectory() {
    console.log("openDirectory")
    this.showAllDirectory=false
  }
}
