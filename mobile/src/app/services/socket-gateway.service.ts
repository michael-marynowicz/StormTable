import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketGatewayService {

  documentChanged$ = new Subject<string>();

  constructor(private socket: Socket) {
    socket.on('documentChanged', (message: { meeting: string}) => {
      this.documentChanged$.next(message.meeting);
    });
  }

  authenticate(userId: string) {
    this.socket.emit('authenticate', {userId});
  }
}
