import {Component, Input, OnInit} from '@angular/core';
import {IconService} from "../../services/icon.service";
import {Observable} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import DocumentModel from "../../models/document.model";
import DirectoryModel from "../../models/directory.model";
import {Session} from "../../models/session.model";
import MiniMapService from "../../services/mini-map.service";
import {UserSession} from "../../models/user-session";
import {MeetingService} from "../../services/meeting.service";
import {hostname} from "../../services/server.config";
import {DocumentService} from "../../services/document.service";

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
  rotation = 0;

  constructor(private iconService: IconService, private sanitizer: DomSanitizer, private minimapService: MiniMapService, private meetingService: MeetingService, private documentService: DocumentService) {
  }

  load() {
    this.loadFile = this.iconService.load(this.doc.url)
    this.isOpen = true;
  }

  ngOnInit(): void {
    const doc = this.documentService.getDocument(this.docId);
    if(!doc) throw new Error("Document not found")
    this.doc = doc;
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.doc.url)
  }

  private hold = false;


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
    //this.minimapVisible = false;
    this.meetingService.moveDocument(this.doc);
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
    const angle = Math.atan2($event.targetTouches[0].clientY - this.doc.position.y,$event.targetTouches[0].clientX - this.doc.position.x) + Math.PI/2
    if (angle) {
      this.doc.rotation = angle;
    }
  }

  endRotate() {
    this.meetingService.moveDocument(this.doc);
  }

  test($event:TouchEvent) {
    console.log("doooooooooooop end",$event)
  }
}
