import {Component, Input, OnInit} from '@angular/core';
import DirectoryModel from "../../models/directory.model";
import DocumentModel from "../../models/document.model";

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.less']
})
export class DirectoryComponent implements OnInit{
  @Input() color!: string
  @Input() directory!: DocumentModel
  printFiles:boolean=false;

  ngOnInit(): void {
    this.directory = this.directory as DirectoryModel
  }


  saveFile() {

  }




}
