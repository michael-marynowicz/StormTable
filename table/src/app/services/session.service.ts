import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Socket} from "ngx-socket-io";
import {Session} from "../models/session.model";
import {DocumentService} from "./document.service";
import {ElementType} from "../models/brainstorm-element.model";
import DirectoryModel from "../models/directory.model";
import DocumentModel from "../models/document.model";

@Injectable({
  providedIn: 'root'
})
export default class SessionService {
  session?: Session;
  session$ = new BehaviorSubject<Session|undefined>(undefined);
  private tableId = "00bb39f2-eb16-45cf-ad7e-1c7c37b1ed2f";

  constructor(private socket: Socket, private documentService: DocumentService) {
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
    const documents = session.meeting.meeting.documents as DocumentModel[];
    this.documentService.inflateDocuments(documents);
  }

  getAllDirectory(){
    return this.session?.meeting.meeting.documents.filter(doc => doc.type===ElementType.DIRECTORY) as DirectoryModel[]
  }

  setUserPosition(userId: string, position: { x: number, y: number }, rotation: number) {
    this.socket.emit("set_user_position", {userId, position, rotation})
  }
}
