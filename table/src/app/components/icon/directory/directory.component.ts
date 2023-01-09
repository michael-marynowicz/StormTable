import { Component } from '@angular/core';
import {DirectoryService} from "../../../services/directory.service";

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.less']
})
export class DirectoryComponent {

  constructor(private directoryService : DirectoryService) {
  }

  createDirectory() {
    this.directoryService.createDirectory()
  }
}
