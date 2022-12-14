import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import { MeetingService } from "../../core/meeting/meeting.service";
import { TableService } from "../table/table.service";
import TableErrors, { TableErrorTypes } from "../table-errors";
import { SessionService } from "../../core/session/session.service";
import { SpotService } from "../spot/spot.service";
import {DocumentService} from "../../core/document/document.service";

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class TableGateway {

  @WebSocketServer()
  server:Server;
  private sessions: { [socketId: string]: string }
  constructor(private meetingService: MeetingService, private tableService: TableService, private sessionService: SessionService, private spotService: SpotService,private documentService: DocumentService) {
    this.documentService.files$.subscribe(_ => this.server?.emit("document",{}))
  }

  @SubscribeMessage('create_session')
  CreateSession(@MessageBody() content: { tableId: string, meetingId: string }, @ConnectedSocket() socket: Socket) {
    if(!this.tableService.exists(content.tableId))
      throw socket.emit('error', new TableErrors(TableErrorTypes.TABLE_NOT_FOUND, 'Table not found.'))
    if(!this.meetingService.get(content.meetingId))
      throw socket.emit('error', new TableErrors(TableErrorTypes.MEETING_NOT_FOUND, 'Meeting not found.'))

    const session = this.sessionService.createSession({ id: content.tableId }, content.meetingId);
    this.sessions[socket.id] = content.tableId;
    return socket.emit('session_created', { session })
  }

  @SubscribeMessage('create_spot')
  createSpot(@MessageBody() content: { position: { x: number, y: number }}, @ConnectedSocket() socket: Socket) {
    const tableId = this.sessions[socket.id];
    const spotCreationResult = this.spotService.createSpot(content.position, tableId);
    socket.emit('spot_created', { spots: spotCreationResult.spots })
  }


}
