import { Component } from '@angular/core';
import {NgxFileDropEntry} from "ngx-file-drop";
import {DropZoneService} from "../../services/drop-zone.service";

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.less']
})
export class DropZoneComponent {
  playerName: any;

  constructor(private dropZoneService : DropZoneService) {
  }

/*
  getFile(){
    this.playerName.preventDefault();
    this.playerName.stopPropagation();
    console.log(this.playerName,this.playerName.dataTransfer)

  }*/

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.dropZoneService.sendFile(file)
          //saveAs(file,file.name)
          // Here you can access the real file
          //console.log(droppedFile.relativePath, file);
          console.log(droppedFile,file)

        });
      } else {

        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

}
