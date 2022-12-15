import {Component, HostListener, Input, OnInit} from '@angular/core';
import {IconService} from "../../services/icon.service";
import {Observable} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import DocumentModel from "../../models/document.model";
import "hammerjs"

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less']
})
export class IconComponent implements OnInit {


  @Input() doc!: DocumentModel;

  private URL = "http://localhost:3000/"

  safeURL!: SafeResourceUrl;

  loadFile: Observable<Object> | undefined

  isOpen: boolean = false;

  rotateValue!: number

  constructor(private iconcservice: IconService, private sanitizer: DomSanitizer) {

  }

  load() {
    this.loadFile = this.iconcservice.load(this.URL + this.doc.path)
    this.isOpen = true;
  }

  ngOnInit(): void {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.URL + this.doc.path)
    this.rotateValue = 0;
  }

  start?: { x: number, y: number }

  @HostListener('drag')
  rotation($event: DragEvent) {
    if (!$event) return;
    console.log($event,this.rotateValue, "before")
    if (!this.start) {
      this.start = {x: $event.clientX, y: $event.clientY}
      return;
    }
    const angle = Math.atan(($event.clientY - this.start.y) / ($event.clientX - this.start.x)) + (($event.clientX - this.start.x) < 0 ? Math.PI : 0);
    if (angle) this.rotateValue = angle;
    // @ts-ignore
    console.log(angle,"after")

  }

}
