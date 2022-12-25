import DocumentModel from "../models/document.model";
import {Injectable} from "@angular/core";
import {io} from "socket.io-client";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {hostname} from "./server.config";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  socket = io(`http://${hostname}:3000`)

  public files: DocumentModel[] = [];

  public files$ = new BehaviorSubject<DocumentModel[]>([]);

  constructor(private httpClient: HttpClient) {
    console.log("the table get the file")
    this.socket.on("document", async () => {
      await this.fetchAllFiles();
    })
  }


  getAllFiles() {
    return this.files;

  }

  addFile(doc: DocumentModel) {
    this.files.push(doc)
    this.files$.next(this.files)
  }

  async fetchAllFiles() {
    await this.httpClient.get<DocumentModel[]>(`http://${hostname}:3000/document/files`).subscribe(files => {
      files.map(file => {
        if (!this.files.includes(file)) this.files.push(file)
      })
      this.files$.next(this.files)
    })

  }

  async fetchFiles() {
    return new Promise<DocumentModel[]>((resolve, reject) =>
      this.httpClient.get<DocumentModel[]>(`http://${hostname}:3000/document/files`).subscribe(files => {
        this.files = files;
        resolve(this.files);
      }, error => reject(error)))
  }

}
