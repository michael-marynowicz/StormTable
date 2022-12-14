import { Component } from '@angular/core';
import {NgxFileDropEntry} from "ngx-file-drop";
import {DropZoneService} from "../../services/drop-zone.service";

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.less']
})
export class DropZoneComponent {
  constructor(private dropZoneService : DropZoneService) {
  }
  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.dropZoneService.sendFile(file)
        });
      }
    }
  }

}
