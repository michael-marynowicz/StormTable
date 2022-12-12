import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
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
  @Output() sendDocumentId = new EventEmitter<string>;

  constructor( public documentService: DocumentService) {
  }

  ngOnInit(){
    this.myFiles = this.documentService.getAllFiles();
    this.documentService.fetchFiles().then(files=>this.myFiles = files);
  }

  showFiles() {
    this.displayDriveFile = !this.displayDriveFile;
  }

}
