import {Injectable} from "@angular/core";
import DocumentModel from "../models/document.model";
import {UserSession} from "../models/user-session";
import {Socket} from "ngx-socket-io";
import {MeetingService} from "./meeting.service";

@Injectable({
  providedIn: 'root'
})
export default class MiniMapService {
  constructor(private socket: Socket, private meetingService: MeetingService) {

  }

  async sendFile(file: string, user: UserSession) {
    //const fileToSend = {...file, position: {x: user.location.x, y: user.location.y}, rotation: user.location.y>window.window.innerHeight/2 ? 0 : 3.141};
    this.socket.emit('share-document', {
      id: file,
      user: user.id,
      rotation: user.rotation
    })
  }

  async deleteIcon(file: DocumentModel) {
    await this.meetingService.removeDocument(file);
  }

}
