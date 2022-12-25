import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import DocumentModel from "../models/document.model";
import {UserSession} from "../models/user-session";
import {hostname} from "./server.config";
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export default class MiniMapService {
  constructor(private socket: Socket) {

  }

  async sendFile(file: string, user: string) {
    this.socket.emit('share-document', { id: file, user })
  }

}
