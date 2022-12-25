import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import SessionService from "../../services/session.service";
import {Session} from "../../models/session.model";
import DocumentModel from "../../models/document.model";
import {MeetingService} from "../../services/meeting.service";

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
  documents: DocumentModel[] = []

  constructor(aroute: ActivatedRoute, private sessionService: SessionService) {
    sessionService.session$.subscribe(session => {
      this.session = session
      this.documents = session.meeting.meeting.documents
    });
    aroute.params.subscribe((_) => {
      const id = aroute.snapshot.params["meetingId"]
      console.log("Creating session")
      sessionService.createSession(id)
    });
  }

  doubleTap(event: MouseEvent) {
    this.sessionService.createSpot({x: event.clientX, y: event.clientY})
  }

  simpleTap(event: MouseEvent) {
    //console.log(event)
  }
}
