import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway
} from "@nestjs/websockets";
import {Socket} from "socket.io";
import {MeetingService} from "../../core/meeting/meeting.service";
import {SessionService} from "../../core/session/session.service";

@WebSocketGateway({
  namespace: 'mobile',
  cors: {
    origin: '*'
  }
})
export class ClientGateway implements OnGatewayConnection {

  private sockets: { [userId: string]: Socket } = {};


  constructor(meetingService: MeetingService, sessionService: SessionService) {
    meetingService.documentsChanged$.subscribe((meetingId) => {
      sessionService.getSessionsByMeeting(meetingId).flatMap(session => session.users).forEach(user => {
        this.emitDocumentChanged(user.id, meetingId);
      });
    });
  }

  @SubscribeMessage('test')
  test(@MessageBody() body: { message: string }, @ConnectedSocket() socket) {
    console.log(body.message);
    socket.emit('test', {message: 'test'})
  }

  handleConnection(client: Socket): any {
    this.sockets[client.handshake.auth.userId] = client;
  }

  emitDocumentChanged(userId: string, meetingId: string) {
    this.sockets[userId]?.emit('documentChanged', { meeting: meetingId });
  }

  @SubscribeMessage('authenticate')
  authenticate(@MessageBody() body: { userId: string }, @ConnectedSocket() socket) {
    this.sockets[body.userId] = socket;
  }

}
