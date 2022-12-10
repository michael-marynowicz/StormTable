import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import DocumentModel from "../../../models/document.model";
import {DocumentService} from "../../../services/document.service";


@Component({
  selector: 'app-personal-space',
  templateUrl: './personal-space.component.html',
  styleUrls: ['./personal-space.component.less']
})
export class PersonalSpaceComponent {

  public displayDriveFile!: boolean;
  public myFiles: DocumentModel[] = [];

  constructor( public documentService: DocumentService) {
    this.myFiles = this.documentService.getAllFiles();
  }

  ngOnInit(){}

  showFiles() {
    this.displayDriveFile = !this.displayDriveFile;
    console.log(this.displayDriveFile);
  }
}
