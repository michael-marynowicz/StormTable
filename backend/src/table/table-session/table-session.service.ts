import { Injectable } from "@nestjs/common";
import TableSession from "./table-session";
import TableErrors, { TableErrorTypes } from "../table-errors";
import Vector from "../models/vector.model";
import { BehaviorSubject } from "rxjs";
import { v4 as new_guid } from 'uuid'

@Injectable()
export class TableSessionService {
  private sessions: TableSession[] = []

  spots: { id: string, x: number, y: number }[] = []
  sessionChanged: BehaviorSubject<TableSession|undefined> = new BehaviorSubject(undefined);

  getSessionByTable(tableId: string) {
    return this.sessions.find(s => s.tableId == tableId)
  }

  getByUser(userId: string) {

  }

  createSession(tableId: string, meetingId: string) {
    console.log("creating session")
    this.sessions.push({ tableId, meetingId, users: [] })
  }

  createSpot(position: { x: number, y: number }): string {
    const id = new_guid();
    console.log("creating spot")
    this.spots.push({ id, x: position.x, y: position.y })
    return id;
  }

  deleteSpot(id: string) {
    this.spots = this.spots.filter(s => s.id !== id)
  }

  private _playerQuit(session: TableSession, userId: string) {
    session.users = session.users.filter(s => s.userId !== userId)
    this.sessionChanged.next(session)
  }
  playerQuit(userId: string) {
    const userSessions = this.sessions.filter(s => !!s.users.find(u => u.userId === userId))
    for(const session of userSessions) {
      this._playerQuit(session, userId)
    }
  }

  playerJoin(tableId: string, userId: string, position: Vector) {
    const session = this.getSessionByTable(tableId)

    // Check the session exists
    if(!session)
      throw new TableErrors(TableErrorTypes.SESSION_NOT_FOUND, "Session not found");

    // Check player don't have any other session
    this.playerQuit(userId);

    // Add the player to the session
    session.users.push({ userId, position })
    this.sessionChanged.next(session);
  }
}
