import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DocumentService} from "./document.service";
import DocumentModel from "../models/document.model";
import {UserSession} from "../models/user-session";

@Injectable({
  providedIn: 'root'
})
export default class MiniMapService {
  constructor(private httpClient: HttpClient, private documentService: DocumentService) {

  }

  async sendFile(file: DocumentModel, user: UserSession) {
    const fileToSend = {...file, position: {x: user.location.x, y: user.location.y}}
    this.documentService.addFile(fileToSend)
  }

  deleteIcon(file: DocumentModel) {
    const index = this.documentService.files.indexOf(file)
    this.documentService.files.splice(index,1)
  }
}
