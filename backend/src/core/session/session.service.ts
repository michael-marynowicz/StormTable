import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import Session from "./work/session";
import { BehaviorSubject, Subject } from "rxjs";
import { v4 as new_guid } from 'uuid'
import TableSession from "./work/table-session";

@Injectable()
export class SessionService {
  private sessions: Session[] = [];
  sessions$ = new BehaviorSubject<Session[]>([]);
  sessionChanged = new Subject<Session>()

  createSession(tableSession: TableSession, meetingId: string) {
    const id = new_guid()
    this.sessions.push({
      sessionId: id,
      users: [],
      table: tableSession,
      meeting: { id: meetingId }
    })
    this.sessions$.next(this.sessions);
    return id;
  }

  private changeSession(session: Session|undefined, callback: (session: Session) => void) {
    if(!session)
      throw new HttpException("No session found for this table.", HttpStatus.NOT_FOUND)
    callback(session);
    this.sessionChanged.next(session);
  }

  private tableChangeSession(tableId: string, modification: (session: Session) => void) {
    const session = this.sessions.find(s => s.table.id === tableId)
    this.changeSession(session, modification);
  }

  private spotChangeSession(spotId: string, modification: (session: Session) => void) {
    const session = this.sessions.find(s => !!s.table.spots.find(s => s.id === spotId))
    this.changeSession(session, modification);
  }


  createSpot(tableId: string, location: { x: number, y: number }) {
    this.tableChangeSession(tableId, (session) => session.table.spots.push({ id: new_guid, location }));
  }


  userJoin(spotId: string, userId: string) {
    this.spotChangeSession(spotId, (session) => {
      const spot = session.table.spots.find(s => s.id === spotId);
      session.users.push({ id: userId, location: spot.location });
      session.table.spots = session.table.spots.filter(s => s.id !== spotId);
    })
  }

  addUser(tableId: string, userId: string, location: { x: number, y: number }) {
    this.tableChangeSession(tableId, session => session.users.push({ id: userId, location }));
  }
}
