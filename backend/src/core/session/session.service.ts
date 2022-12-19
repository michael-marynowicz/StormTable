import {Injectable, Scope} from "@nestjs/common";
import Session from "./work/session";
import {BehaviorSubject, Subject} from "rxjs";
import {v4 as new_guid} from "uuid";
import TableSession from "./work/table-session";
import {Socket} from "socket.io";
import {MeetingService} from "../meeting/meeting.service";
import {UserService} from "../user/user.service";
import SessionDto, {aggregateDto} from "./dto/session.dto";
import {TableService} from "../table/table.service";
import TableNotFound from "../errors/table-not-found.error";
import MeetingNotFound from "../errors/meeting-not-found.error";
import SessionNotFoundError from "../errors/session-not-found.error";

@Injectable({
    scope: Scope.DEFAULT
})
export class SessionService {

    private sessions: { [id: string]: Session } = {}
    sessions$ = new BehaviorSubject<Session[]>([]);
    sessionChanged = new Subject<Session>()

    constructor(private userService: UserService, private meetingService: MeetingService, private tableService: TableService) {
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
            location: spot.location
        })
        this.sessionChanged.next(session)
    }
}
