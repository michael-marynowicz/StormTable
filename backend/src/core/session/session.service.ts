import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import Session from "./work/session";
import { BehaviorSubject } from "rxjs";
import { v4 as new_guid } from 'uuid'
import TableSession from "./work/table-session";

@Injectable()
export class SessionService {
  private sessions: Session[] = [];
  sessions$ = new BehaviorSubject<Session[]>([]);

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

  addUser(tableId: string, userId: string, location: { x: number, y: number }) {
    const session = this.sessions.find(s => s.table.id === tableId)
    if(!session)
      throw new HttpException("No session found for this table.", HttpStatus.NOT_FOUND)
    session.users.push({ id: userId, location })
    this.sessions$.next(this.sessions);
  }
}
