import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway()
export class ClientGateway {
  @SubscribeMessage('test')
  test(@MessageBody() body: { message: string }, @ConnectedSocket() socket) {
    console.log(body.message);
    socket.emit('test', {message: 'test'})
  }

}
