import {Component} from '@angular/core';
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
  documents: string[] = []

  constructor(aroute: ActivatedRoute, private sessionService: SessionService, private documentService: DocumentService) {
    sessionService.session$.subscribe(session => {
      if(!session) return;
      this.session = session
    });
    documentService.documents$.subscribe(documents => {
      this.documents = documents;
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

  allIconsToPrint(){
    return this.sessionService.session?.meeting.meeting.documents.filter(doc =>doc.parent===undefined).map(doc => doc.id)
  }
}
