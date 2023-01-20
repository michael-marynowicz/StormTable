import {Component, Input, OnInit} from '@angular/core';
import {IconService} from "../../services/icon.service";
import {Observable} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import DocumentModel from "../../models/document.model";
import DirectoryModel from "../../models/directory.model";
import {Session} from "../../models/session.model";
import {DocumentService} from "../../services/document.service";
import MiniMapService from 'src/app/services/mini-map.service';
import {UserSession} from "../../models/user-session";
import {MeetingService} from "../../services/meeting.service";

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less']
})
export class IconComponent implements OnInit {
  @Input() docId!: string;
  doc!: DocumentModel;
  session!: Session

  safeURL!: SafeResourceUrl;

  loadFile: Observable<Object> | undefined

  isOpen: boolean = false;

  minimapVisible: boolean = false;

  dropPoint = {x: 0, y: 0};
  rotation=0;
  private hold = false;
  printAllName: Boolean = false;
  @Input() docName! : string[];
  @Input() edit: boolean = true;
  @Input() docPath!: string;

  constructor(private iconService: IconService, private sanitizer: DomSanitizer,public documentService: DocumentService, private minimapService: MiniMapService, private meetingService: MeetingService) {
  }

  pinch(){
    this.edit= ! this.edit;
    console.log("pinch to open/close edition view");
  }


  load() {
    this.loadFile = this.iconService.load(this.doc.url)
    this.isOpen = true;
  }

  ngOnInit(): void {
    const doc = this.documentService.getDocument(this.docId);
    if(!doc) throw new Error("Document not found")
    this.doc = doc;
    this.docName  = this.doc.name.split(".", 3);
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.doc.url)
  }


  get color(){
    return (this.doc as DirectoryModel).color
  }

  mousedown() {
    this.dragStart()
    document.addEventListener('mouseup', () => {
      this.dragEnd()
    });
    document.addEventListener('mousemove', (_) => {
      this.dragging();
    });
  }

  touchstart() {
    this.printAllName=true;
    this.dragStart()
    document.addEventListener('touchend', () => {
      this.dragEnd()
    });
    document.addEventListener('touchmove', (event) => {
      this.dragging({x: event.touches[0].clientX, y: event.touches[0].clientY});
    });
  }

  private dragStart() {
    this.hold = true;
  }

  private dragging(position: { x: number, y: number } = {x: 0, y: 0}) {
    if (this.hold) {
      this.doc.position.x = position.x - 30;
      this.doc.position.y = position.y - 30;
    }
  }

  private dragEnd() {
    if (!this.hold) return;
    this.hold = false;
    this.meetingService.moveDocument(this.doc);
    this.printAllName=false;
  }

  showMinimap() {
    this.minimapVisible = true;
    this.dropPoint = {x: 110, y: 70}
  }

  onSendToUser(users: UserSession[]) {
    users.forEach(user => this.minimapService.sendFile(this.doc.id, user));
    this.minimapVisible = false;
  }

  setRotation($event: TouchEvent) {
    if (!$event) return;
    this.hold = false;
    console.log("@@@@@@@@@",$event)
    const angle = Math.atan2($event.targetTouches[0].clientY - this.doc.position.y,$event.targetTouches[0].clientX - this.doc.position.x) + Math.PI/2
    if (angle) {
      this.doc.rotation = angle;
    }
  }

  endRotate() {
    this.meetingService.moveDocument(this.doc);
    this.printAllName=false;
  }

  safePath(doc: DocumentModel) {
    //return this.URL + doc.path.replace("\\","/");
    return doc.url;
  }

  name(docName: string) {
    return docName.length<12 || this.printAllName ? docName : docName.substr(0, 12) + "..."
  }
}
