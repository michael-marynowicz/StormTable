import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {Socket} from "socket.io";
import TableError, {TableErrorTypes} from "../table-error";
import {SessionService} from "../../core/session/session.service";
import {UseFilters} from "@nestjs/common";
import SocketErrorFilter from "./socket-error-filter";
import {v4 as new_guid} from "uuid";

@WebSocketGateway({
    cors: {
        origin: "*"
    }
})
export class TableGateway {

    private sessions: { [socketId: string]: string } = {}

    constructor(private sessionService: SessionService) {
    }


    @SubscribeMessage('create_session')
    @UseFilters(new SocketErrorFilter())
    createSession(@MessageBody() content: { tableId: string, meetingId: string }, @ConnectedSocket() socket: Socket) {
        const session = this.sessionService.createSession({id: content.tableId, spots: []}, content.meetingId);
        this.sessions[socket.id] = session.sessionId;
        this.sessionService.sessionChanged.subscribe(s => {
            if (s.sessionId === session.sessionId) {
                socket.emit("session", {session: this.sessionService.getAggregatedSession(session)})
            }
        })
        socket.emit('session_created', {session: this.sessionService.getAggregatedSession(session)})
    }

    @SubscribeMessage('create_spot')
    @UseFilters(new SocketErrorFilter())
    createSpot(@MessageBody() body: { location: { x: number, y: number } }, @ConnectedSocket() socket) {
        const sessionId = this.sessions[socket.id];
        console.log(socket.id)
        if (!sessionId)
            throw new TableError(TableErrorTypes.SESSION_NOT_FOUND, "Session not found.")
        this.sessionService.updateSession(sessionId, socket, session => {
            session.table.spots.push({
                id: new_guid(),
                location: body.location
            })
        })
    }


}
