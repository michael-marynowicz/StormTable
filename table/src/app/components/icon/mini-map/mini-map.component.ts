import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import "hammerjs"
import SessionService from "../../../services/session.service";
import {Session} from "../../../models/session.model";
import MiniMapService from "../../../services/mini-map.service";
import {UserSession} from "../../../models/user-session";
import DocumentModel from "../../../models/document.model";

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.less']
})

export class MiniMapComponent implements OnInit {

  over = false;
  @Input() file!: DocumentModel;
  @Output() onSendTo = new EventEmitter<UserSession[]>();

  @Output() close = new EventEmitter<string>();

  session?: Session


  constructor(private sessionService: SessionService, private miniMapService: MiniMapService) {
  }


  getUsername(session: UserSession) {
    return session.user.name;
  }


  getUsers(): UserSession[] {
    return this.session?.users || []
  }


  ngOnInit(): void {
    this.sessionService.session$.subscribe(session => {
      this.session = session
    });
  }

  sendTo(users: UserSession[]) {
    this.onSendTo.emit(users);
  }

  async deleteIcon() {
    await this.miniMapService.deleteIcon(this.file)
  }
}
