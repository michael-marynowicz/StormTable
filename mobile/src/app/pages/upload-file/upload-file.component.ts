import { Component } from '@angular/core';
import {MeetingService} from "../../services/meeting.service";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.less']
})
export class UploadFileComponent {
  uploading = false;
  uploaded = false;

  files: File[] = [];

  constructor(private meetingService: MeetingService) {
  }

  onFilesChange(files: Event) {
    const target = files.target as HTMLInputElement;
    this.files = [...this.files, ...Array.from(target.files as FileList)];
  }

  removeFile(file: File) {
    this.files = this.files.filter(f => f !== file);
  }

  async upload() {
    this.uploading = true;
    await this.meetingService.uploadFile(this.files);
    this.uploaded = true;
  }
}
