import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { MeetingService } from "../../core/meeting/meeting.service";
import { TableService } from "../table/table.service";
import TableError, { TableErrorTypes } from "../table-error";
import { SessionService } from "../../core/session/session.service";
import { SpotService } from "../spot/spot.service";
import { UseFilters } from "@nestjs/common";
import SocketErrorFilter from "./socket-error-filter";

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class TableGateway {

  private sessions: { [socketId: string]: string } = {}
  constructor(private meetingService: MeetingService, private tableService: TableService, private sessionService: SessionService, private spotService: SpotService) {
  }

  @SubscribeMessage('create_session')
  @UseFilters(new SocketErrorFilter())
  CreateSession(@MessageBody() content: { tableId: string, meetingId: string }, @ConnectedSocket() socket: Socket) {
    if(!this.tableService.exists(content.tableId))
      throw socket.emit('error', new TableError(TableErrorTypes.TABLE_NOT_FOUND, 'Table not found.'))
    if(!this.meetingService.get(content.meetingId))
      throw socket.emit('error', new TableError(TableErrorTypes.MEETING_NOT_FOUND, 'Meeting not found.'))

    const session = this.sessionService.createSession({ id: content.tableId, spots: [] }, content.meetingId);
    this.sessions[socket.id] = content.tableId;
    return socket.emit('session_created', { session })
  }

  @SubscribeMessage('create_spot')
  @UseFilters(new SocketErrorFilter())
  createSpot(@MessageBody() content: { position: { x: number, y: number }}, @ConnectedSocket() socket: Socket) {
    const tableId = this.sessions[socket.id];
    const spotCreationResult = this.spotService.createSpot(content.position, tableId);
    socket.emit('spot_created', { spots: spotCreationResult.spots })
  }


}
