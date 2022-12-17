import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DocumentService} from "./document.service";
import DocumentModel from "../models/document.model";

@Injectable({
  providedIn: 'root'
})
export default class MiniMapService {
  constructor(private httpClient: HttpClient, private documentService: DocumentService) {

  }

  async sendFile(fileId: string, position: { x: number, y: number }) {
    await this.httpClient.get<DocumentModel>("http://localhost:3000/document/" + fileId).subscribe(file => {
      file.position = {x: position.x, y: position.y - 150};
      console.log(file.position, "position receive")
      this.documentService.addFile(file)
    })

  }

}
