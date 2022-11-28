import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class SocketGateway {
  @SubscribeMessage('newMessage')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() socket: Socket) {
    socket.emit("newMessage", {
      type: "newMessage",
      content: data
    });
  }
}
