import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import { MeetingService } from "../../core/meeting/meeting.service";
import { TableService } from "../../core/table/table.service";
import TableError, { TableErrorTypes } from "../table-error";
import { SessionService } from "../../core/session/session.service";
import { SpotService } from "../spot/spot.service";
import { UseFilters } from "@nestjs/common";
import SocketErrorFilter from "./socket-error-filter";
import { v4 as new_guid } from "uuid";
import { aggregateDto } from "../../core/session/dto/session.dto";
import { UserService } from "../../core/user/user.service";

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
    console.log("creating session")
    const session = this.sessionService.createSession({ id: content.tableId, spots: [] }, content.meetingId);
    this.sessions[socket.id] = session.sessionId;
    this.sessionService.sessionChanged.subscribe(s => {
      console.log(session.sessionId + " === " + s.sessionId)
      if(s.sessionId === session.sessionId) {
        console.log("Session sync.")
        socket.emit("session", { session: this.sessionService.getAggregatedSession(session) })
      }
    })
    socket.emit('session_created', { session: this.sessionService.getAggregatedSession(session) })
    console.log(this.sessions)
    console.log(session)
  }

  @SubscribeMessage('create_spot')
  @UseFilters(new SocketErrorFilter())
  createSpot(@MessageBody() body: { location: { x: number, y: number }}, @ConnectedSocket() socket) {
    const sessionId = this.sessions[socket.id];
    console.log("Creating spot")
    console.log(JSON.stringify(this.sessions))
    console.log(socket.id)
    if(!sessionId)
      throw new TableError(TableErrorTypes.SESSION_NOT_FOUND, "Session not found.")
    console.log(sessionId)
    this.sessionService.updateSession(sessionId, socket, session => {
      session.table.spots.push({
        id: new_guid(),
        location: body.location
      })
    })
  }


}
