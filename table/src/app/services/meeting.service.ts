import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MeetingModel} from "../models/meeting.model";
import DocumentModel from "../models/document.model";
import {Socket} from "ngx-socket-io";


@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  constructor(private http: HttpClient, private socket: Socket) {
  }

  async getMeetings(): Promise<MeetingModel[]> {
    return new Promise((resolve, reject) => this.http.get<MeetingModel[]>('{main}/meeting').subscribe(meetings => resolve(meetings), reject))
  }

  moveDocument(doc: DocumentModel) {
    this.socket.emit('document-position', {id: doc.id, position: doc.position, rotation: doc.rotation})
  }

  async removeDocument(doc: DocumentModel) {
    await this.http.delete(`{main}/document/${doc.id}`).toPromise();
  }

}
