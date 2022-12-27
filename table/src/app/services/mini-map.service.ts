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
  sendFile(file: DocumentModel, user: UserSession) {
    const fileToSend = {...file, position: {x: user.location.x, y: user.location.y}, rotation: user.location.y>500 ? 0 : 180};
    this.documentService.addFile(fileToSend)
  }
  async deleteIcon(file: DocumentModel) {
    const index = this.documentService.files.indexOf(file)
    this.documentService.files.splice(index, 1)
    this.httpClient.delete(`http://${hostname}:3000/document/${file.name}`).subscribe()
  }

}
