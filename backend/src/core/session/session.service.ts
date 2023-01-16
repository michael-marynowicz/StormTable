import {Injectable, Scope} from "@nestjs/common";
import Session from "../models/session/work/session";
import {BehaviorSubject, Subject} from "rxjs";
import {v4 as new_guid} from "uuid";
import TableSession from "../models/session/work/table-session";
import {Socket} from "socket.io";
import {MeetingService} from "../meeting/meeting.service";
import {UserService} from "../user/user.service";
import {TableService} from "../table/table.service";
import TableNotFound from "../errors/table-not-found.error";
import MeetingNotFound from "../errors/meeting-not-found.error";
import SessionNotFoundError from "../errors/session-not-found.error";
import SessionDto from "../models/session/dto/session.dto";
import { aggregateDto } from "./session.dto-converter";

@Injectable({
    scope: Scope.DEFAULT
})
export class SessionService {

    private sessions: { [id: string]: Session } = {}
    sessions$ = new BehaviorSubject<Session[]>([]);
    sessionChanged = new Subject<Session>()

    constructor(private userService: UserService, private meetingService: MeetingService, private tableService: TableService) {
        meetingService.meetingChanged$.subscribe(meetingId => {
            const session = this.getSessionByMeeting(meetingId);
            if(session)
                this.sessionChanged.next(session);
        })
    }

    getAggregatedSession(session: Session): SessionDto {
        return aggregateDto(session, this.userService, this.tableService, this.meetingService);
    }

    createSession(tableSession: TableSession, meetingId: string) {
        if (!this.tableService.get(tableSession.id))
            throw TableNotFound();
        if (!this.meetingService.get(meetingId))
            throw MeetingNotFound();
        const existingSession = Object.values(this.sessions).find(s => s.table.id === tableSession.id && s.meeting.id === meetingId)
        if (!!existingSession) {
            existingSession.table.spots = []
            return existingSession;
        }
        const id = new_guid();
        const session: Session = {
            sessionId: id,
            table: tableSession,
            meeting: {
                id: meetingId
            },
            users: []
        }
        this.sessions[id] = session;
        this.sessions$.next(Object.values(this.sessions))
        return session;
    }

    updateSession(sessionId: string, socket: Socket, change: (session: Session) => void) {
        const session = this.sessions[sessionId];
        if (!session)
            throw SessionNotFoundError()
        change(session);
        this.sessionChanged.next(session);
        //socket.emit("session", { session });
    }

    userJoin(userId: string, spotId: string) {
        const session = Object.values(this.sessions).find(s => !!s.table.spots.find(spot => spot.id === spotId))
        if (!session)
            throw SessionNotFoundError()

        session.users = session.users.filter(u => u.id !== userId)
        const spot = session.table.spots.find(s => s.id == spotId)
        session.table.spots = session.table.spots.filter(s => s.id !== spotId);
        session.users.push({
            id: userId,
            location: spot.location,
            rotation:0  
        })
        this.sessionChanged.next(session)
    }

    getSessionByUser(user: string) {
        return Object.values(this.sessions).find(s => !!s.users.find(u => u.id === user))
    }

    getSessionByMeeting(meetingId: string) {
        return Object.values(this.sessions).find(s => s.meeting.id === meetingId);
    }

    getSessionByDocument(documentId: string) {
        return Object.values(this.sessions).find(s => this.meetingService.get(s.meeting.id).documents.find(d => d.id === documentId))
    }

    getMeetingByUser(userId:string) {
        const session = this.getSessionByUser(userId);
        if(!session) return undefined;
        return this.meetingService.get(session.meeting.id);
    }

    changeDocumentPosition(id: string, position: { x:number, y: number }, rotation: number) {
        this.meetingService.moveDocument(id, position, rotation);
    }

    sendDocumentTo(documentId: string, userId: string, rotation: number) {
        const session = this.getSessionByDocument(documentId);
        if(!session)
            throw "Session not found."
        const user = session.users.find(u => u.id === userId);
        if(!user) {
            console.log("USER NOT FOUND", session, user.id)
            throw "There is no user with this id in this session.";
        }

        this.meetingService.duplicateDocument(documentId, user.location, rotation);
    }
}
