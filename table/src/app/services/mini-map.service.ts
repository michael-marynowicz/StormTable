import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import DocumentModel from "../models/document.model";
import {UserSession} from "../models/user-session";
import {hostname} from "./server.config";

@Injectable({
  providedIn: 'root'
})
export default class MiniMapService {
  constructor(private httpClient: HttpClient) {

  }

  async sendFile(file: string, user: string) {
    /// TODO: send file to others through socket
  }

}
