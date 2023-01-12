import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Socket} from "ngx-socket-io";
import {HttpClient} from "@angular/common/http";
import {Session} from "../models/session.model";
import {DocumentService} from "./document.service";
import {ElementType} from "../models/brainstorm-element.model";
import DirectoryModel from "../models/directory.model";

@Injectable({
  providedIn: 'root'
})
export default class SessionService {
  session?: Session;
  session$ = new BehaviorSubject<Session|undefined>(undefined);
  private tableId = "00bb39f2-eb16-45cf-ad7e-1c7c37b1ed2f";

  constructor(private socket: Socket, private http: HttpClient, private documentService: DocumentService) {
  }

  createSession(meetingId: string) {
    this.socket.on("session_created", (content: { session: Session }) => {
      this.inflateSession(content.session);
      console.log("Created session: " + content.session.id);
    })
    this.socket.on('session', (content: { session: Session }) => {
      console.log("Update session: ", content.session);
      console.log("Spots: ", content.session.table.spots.map(s => s.id));
      if (content.session.id === this.session?.id) {
        this.inflateSession(content.session)
      }
    })
    this.socket.emit("create_session", {
      tableId: this.tableId,
      meetingId
    })
  }

  createSpot(location: { x: number, y: number }) {
    console.log("Create spot at : " + JSON.stringify(location))
    this.socket.emit("create_spot", {location})
  }

  private inflateSession(session: Session) {
    this.session = session;
    this.session$.next(session);
    this.documentService.inflateDocuments(session.meeting.meeting.documents);
  }
  getAllDirectory(){
    return this.session?.meeting.meeting.documents.filter(doc => doc.type===ElementType.DIRECTORY) as DirectoryModel[]
  }
}
