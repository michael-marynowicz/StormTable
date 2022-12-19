import {Component, Input, OnInit} from '@angular/core';
import "hammerjs"
import SessionService from "../../../services/session.service";
import {Session} from "../../../models/session.model";
import MiniMapService from "../../../services/mini-map.service";
import {UserModel} from "../../../models/user.model";
import CdkDragAvoiderService from "../../../services/cdk-drag-avoider.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.less']
})
export class MiniMapComponent implements OnInit {

  @Input()
  isDrag!: boolean;

  @Input() fileId!: string

  session?: Session

  overEveryone?: Subscription;

  constructor(private sessionService: SessionService, private miniMapService: MiniMapService, private cdkDragAvoider: CdkDragAvoiderService) {
    sessionService.session$.subscribe(session => {
      this.session = session
    });
  }



  getUsers() {
    return this.session?.users || []
  }

  getUsersPosition() {
    return this.session?.users.map(user => user.location)
  }

  getUserPosition(user: UserModel) {

    return this.session?.users.find(u => u.user.id === user.id)!.location
  }

  ngOnInit(): void {
    this.sessionService.triggerSubject()
  }


  sendFile(user: UserModel) {
    let position = this.getUserPosition(user)
    this.miniMapService.sendFile(this.fileId, position!)
  }

  sendFileToEveryOne() {
    this.getUsers().forEach(user => this.sendFile(user.user))
  }

  listenDrag() {
    this.overEveryone = this.cdkDragAvoider.onMouseUp.subscribe(() => {
      this.sendFileToEveryOne()
      this.stopListenDrag();
    });
  }

  stopListenDrag() {
    this.overEveryone?.unsubscribe()
  }
}
