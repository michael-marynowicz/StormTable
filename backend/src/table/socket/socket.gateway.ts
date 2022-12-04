import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { MeetingService } from "../../core/meeting/meeting.service";
import { TableService } from "../table/table.service";
import TableErrors, { TableErrorTypes } from "../table-errors";
import { TableSessionService } from "../table-session/table-session.service";

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class SocketGateway {
  constructor(private meetingService: MeetingService, private tableService: TableService, private tableSessionService: TableSessionService) {
    console.log("Initialize.")
  }
  counter: number = 0;
  @SubscribeMessage('newMessage')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() socket: Socket) {
    socket.emit("newMessage", {
      type: "newMessage",
      content: data
    });
    socket.emit("title", `Hello ! (${this.counter})`)
    this.counter++;
  }

  @SubscribeMessage('createSession')
  createSession(@MessageBody() data: { clientId: string, clientSecret: string, meetingId: string }, @ConnectedSocket() socket: Socket) {
    let meeting = this.meetingService.get(data.meetingId);
    let table = this.tableService.authTable(data.clientId, data.clientSecret)

    // Check meeting and table exist before start
    if(!meeting)
    {
      socket.emit("error", {
        type: "MEETING_NOT_FOUND",
        message: "meeting not found."
      })
      return;
    }
    if(!table) {
      socket.emit("error", new TableErrors(TableErrorTypes.TABLE_NOT_FOUND, "Table not found."))
      return;
    }

    // Create a session.
    this.tableSessionService.createSession(table.id, meeting.id);

    // Subscribe to meeting related events
    this.meetingService.subject.subscribe((v) => {
      if(v.meetingId !== data.meetingId) return;
      let meeting = this.meetingService.get(data.meetingId);

      // If meeting has been removed return an error.
      if(!meeting)
      {
        socket.emit("error", {
          type: "MEETING_NOT_FOUND",
          message: "meeting not found."
        })
      } else {
        socket.emit("meeting", this.meetingService.get(data.meetingId))
      }
    })

    // Subscribe to session related events
    this.tableSessionService.sessionChanged.subscribe(v => {
      if(!v || v.tableId != table.id) return;
      socket.emit("session", v)
    });

    // Return a response to the request.
    socket.emit("meeting", this.meetingService.get(data.meetingId));
  }

}
