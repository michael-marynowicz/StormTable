import {Component, Input, OnInit} from '@angular/core';
import {IconService} from "../../services/icon.service";
import {Observable} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import DocumentModel from "../../models/document.model";
import {CdkDragEnd, CdkDragStart} from "@angular/cdk/drag-drop";
import {Session} from "../../models/session.model";

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less']
})
export class IconComponent implements OnInit {

  @Input() doc!: DocumentModel;

  session!: Session

  private URL = "http://localhost:3000/"

  safeURL!: SafeResourceUrl;

  loadFile: Observable<Object> | undefined

  isOpen: boolean = false;

  isDrag: boolean = false;

  dropPoint = {x: 0, y: 0};

  constructor(private iconService: IconService, private sanitizer: DomSanitizer) {
  }


  load() {
    this.loadFile = this.iconService.load(this.URL + this.doc.path)
    this.isOpen = true;
  }

  ngOnInit(): void {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.URL + this.doc.path)
  }

  drag($event?: CdkDragStart) {
    this.isDrag = !this.isDrag;
    if ($event && this.isDrag) {
      this.dropPoint = $event.source.getFreeDragPosition();
      this.dropPoint.x += this.dropPoint.x >= (window.innerWidth - 300) ? -150 : 150
    }
  }

  dragEnd($event: CdkDragEnd) {
    this.isDrag = !this.isDrag;
    console.log($event);
  }
}
