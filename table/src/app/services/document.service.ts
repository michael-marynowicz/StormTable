import DocumentModel from "../models/document.model";
import {Injectable} from "@angular/core";
import {ErrorAlert} from "./alert.service";
import {Socket} from "ngx-socket-io";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private files: DocumentModel[] = []

  constructor(private socket: Socket, private httpClient: HttpClient) {
    // create connection to your file storage

  }

  getAllFiles(){
    return this.files;
  }

  async fetchFiles(){
    return new Promise<DocumentModel[]>((resolve, reject)=>
      this.httpClient.get<DocumentModel[]>("http://localhost:3000/document/files").subscribe(files => {
        this.files = files;
        resolve(this.files);
      },error => reject(error)))
  }

}
