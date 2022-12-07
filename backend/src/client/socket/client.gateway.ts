import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";

@WebSocketGateway()
export class ClientGateway {
  @SubscribeMessage('user_join')
  userJoin(@MessageBody() content: { spotId: string }, @ConnectedSocket() socket: Socket) {

  }
}
