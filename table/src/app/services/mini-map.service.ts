import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DocumentService} from "./document.service";
import DocumentModel from "../models/document.model";
import {UserSession} from "../models/user-session";
import {hostname} from "./server.config";

@Injectable({
  providedIn: 'root'
})
export default class MiniMapService {
  constructor(private httpClient: HttpClient, private documentService: DocumentService) {

  }

  async sendFile(file: DocumentModel, user: UserSession) {
    /* await this.httpClient.get<DocumentModel>(`http://${hostname}:3000/document/` + fileId).subscribe(file => {
      file.position = {x: user.location.x, y: user.location.y};
      console.log(file.position, "position receive")
      this.documentService.addFile(file)
    }) */
    const fileToSend = {...file, position: {x: user.location.x, y: user.location.y}}
    this.documentService.addFile(fileToSend)
  }

}
