import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Socket} from "ngx-socket-io";
import {HttpClient} from "@angular/common/http";
import {Session} from "../models/session.model";
import {hostname} from "./server.config";

@Injectable({
  providedIn: 'root'
})
export default class SessionService {
  private session?: Session;
  public session$ = new Subject<Session>();

  private tableId = "00bb39f2-eb16-45cf-ad7e-1c7c37b1ed2f";

  constructor(private socket: Socket, private http: HttpClient) {
    socket.on('session', (content: { session: Session }) => console.log(content.session.table.spots.length))
  }

  getSession() {
    return this.session;
  }

  createSession(meetingId: string) {
    this.socket.on("session_created", (content: { session: Session }) => {
      this.session = content.session;
      this.session$.next(this.session)
      console.log("Created session: " + content.session.id);
    })
    this.socket.on('session', (content: { session: Session }) => {
      console.log("Update session: " + JSON.stringify(content))
      if (content.session.id === this.session?.id) {
        this.session = content.session;
        this.session$.next(this.session);
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

  fetchSession(sessionId: string) {
    this.http.get<Session>(`http://${hostname}:3000/session/` + sessionId).subscribe(session => {
      this.sessionUpdated({session})
    }, error => {
      throw error
    })
  }


  private sessionCreated(content: { session: Session }) {
    this.sessionUpdated(content);
  }


  private sessionUpdated(content: { session: Session }) {
    this.session = content.session;
    this.session$.next(this.session);
  }

  public triggerSubject() {
    if (!this.session) return;
    this.session$.next(this.session)
  }
}
