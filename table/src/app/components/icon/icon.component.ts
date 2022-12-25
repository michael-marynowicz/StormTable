import {Component, Input, OnInit} from '@angular/core';
import {IconService} from "../../services/icon.service";
import {Observable} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import DocumentModel from "../../models/document.model";
import {Session} from "../../models/session.model";
import MiniMapService from "../../services/mini-map.service";
import {UserSession} from "../../models/user-session";
import {MeetingService} from "../../services/meeting.service";

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

  minimapVisible: boolean = false;

  dropPoint = {x: 0, y: 0};

  constructor(private iconService: IconService, private sanitizer: DomSanitizer, private minimapService: MiniMapService, private meetingService: MeetingService) {
  }


  load() {
    this.loadFile = this.iconService.load(this.URL + this.doc.path)
    this.isOpen = true;
  }

  ngOnInit(): void {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.URL + this.doc.path)
  }

  private dragStartPosition?: { x: number, y: number };

  private hold = false;
  mousedown(event: MouseEvent) {
    this.dragStart()
    document.addEventListener('mouseup', () => {
      this.dragEnd()
    });
    document.addEventListener('mousemove', (event) => {
      this.dragging();
    });
  }

  touchstart(event: TouchEvent) {
    this.dragStart()
    document.addEventListener('touchend', () => {
      this.dragEnd()
    });
    document.addEventListener('touchmove', (event) => {
      this.dragging({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    });
  }

  private dragStart() {
    this.hold = true;
  }

  private dragging(position: { x: number, y: number } = {x: 0, y: 0}) {
    if(this.hold) {
      this.doc.position.x = position.x - 30;
      this.doc.position.y = position.y - 30;
    }
  }

  private dragEnd() {
    this.hold = false;
    //this.minimapVisible = false;
    this.meetingService.moveDocument(this.doc);
  }

  showMinimap($event: Event) {
    this.minimapVisible = true;
    const event = $event as unknown as { center: { x: number, y: number } };
    // this.dropPoint = event.center
    // this.dropPoint.x += this.dropPoint.x >= (window.innerWidth - 300) ? -50 : 50
    this.dropPoint = { x: 50, y: 50}
  }

  onSendToUser(users: UserSession[]) {
    users.forEach(user => this.minimapService.sendFile(this.doc.id, user.id));
    this.minimapVisible = false;
  }
}
