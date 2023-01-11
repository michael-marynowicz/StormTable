import {Component, Input} from '@angular/core';
import {DocumentModel} from "../../models/document.model";

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.less']
})
export class FileViewComponent {
  @Input() documents!: DocumentModel[];
}
