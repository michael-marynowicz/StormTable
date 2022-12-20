import {Component, Input, OnInit} from '@angular/core';
import {IconService} from "../../services/icon.service";
import {Observable} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import DocumentModel from "../../models/document.model";
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

  @Input() docName! : string[];

  constructor(private iconService: IconService, private sanitizer: DomSanitizer) {
  }


  load() {
    this.loadFile = this.iconService.load(this.URL + this.doc.path)
    this.isOpen = true;
  }

  ngOnInit(): void {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.URL + this.doc.path)
    this.docName  = this.doc.name.split(".", 3);
  }


  drag($event: Event) {
    this.isDrag = true;
    const event = $event as unknown as { center: { x: number, y: number } };
    this.dropPoint = event.center
    this.dropPoint.x += this.dropPoint.x >= (window.innerWidth - 300) ? -150 : 150
  }

}
