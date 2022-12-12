import DocumentModel from "../models/document.model";
import {Injectable} from "@angular/core";
import {Socket} from "ngx-socket-io";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private files: DocumentModel[] = [];

  public files$ = new BehaviorSubject<DocumentModel[]>([]);

  constructor(private socket: Socket,private httpClient : HttpClient) {
    socket.on("document", () => this.fetchAllFiles())
  }

  getAllFiles(){
    return this.files;

  }
  fetchAllFiles(){
    this.httpClient.get<DocumentModel[]>("http://localhost:3000/document/files").subscribe(files =>{
      this.files=files;
      this.files$.next(this.files)
    })

  }

}
