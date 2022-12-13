import DocumentModel from "../models/document.model";
import {Injectable} from "@angular/core";
import {ErrorAlert} from "./alert.service";
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private files: DocumentModel[] = []

  constructor(private socket: Socket) {
    // create connection to your file storage
  }

  getAllFiles(){
    console.log(this.files);
    return this.files;
  }

}
