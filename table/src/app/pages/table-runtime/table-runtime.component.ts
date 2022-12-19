import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import SessionService from "../../services/session.service";
import {Session} from "../../models/session.model";
import {DocumentService} from "../../services/document.service";

@Component({
  selector: 'app-table-runtime',
  templateUrl: './table-runtime.component.html',
  styleUrls: ['./table-runtime.component.less']
})
export class TableRuntimeComponent {

  get spots() {
    return this.session?.table.spots ?? []
  }

  get users() {
    return this.session?.users ?? []
  }


  session?: Session;
  constructor(aroute: ActivatedRoute, private sessionService: SessionService, public documentService: DocumentService) {
    sessionService.session$.subscribe(session => {
      console.log(session)
      this.session = session
    });
    aroute.params.subscribe((_) => {
      const id = aroute.snapshot.params["meetingId"]
      console.log("Creating session")
      sessionService.createSession(id)
    });
  }

  doubleTap(event: MouseEvent) {
    this.sessionService.createSpot({ x: event.clientX, y: event.clientY })
  }

  simpleTap(event: MouseEvent) {
  }
}
