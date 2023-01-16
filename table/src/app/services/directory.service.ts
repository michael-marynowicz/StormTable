import {Injectable} from '@angular/core';
import {io} from "socket.io-client";
import {BehaviorSubject} from "rxjs";
import {ElementType} from "../models/brainstorm-element.model";
import DirectoryModel from "../models/directory.model";
import {MeetingService} from "./meeting.service";
import {HttpClient} from "@angular/common/http";
import DocumentModel from "../models/document.model";
import {socketDomain} from "../../../domain.config";

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  socket = io(socketDomain);

  directory$ = new BehaviorSubject<DirectoryModel[]>([]);
  directory : DirectoryModel[] = [];
  constructor(private meetingService: MeetingService,private httpClient: HttpClient) { }

  async createDirectory(p: { x: number; y: number }, color: string, file: DocumentModel) {
    const dir: DirectoryModel = {
      name: "doc" + "-" + this.directory.length,
      path: "./files/",
      position: {x: p.x, y: p.y},
      rotation: 0,
      type: ElementType.DIRECTORY,
      id: "doc" + "-" + Date.now(),
      color: color,
      files: [],
      parent:undefined,
      url:""
    }
    this.directory.push(dir)
    await this.httpClient.post(`{main}/directory/create`, {directory: dir, fileId: file.id}).subscribe(_ =>{
      this.socket.emit("sendToDirectory",{file:file,directory:dir})
    })

  }

  uploadFile(file: DocumentModel,directory: DirectoryModel) {
    this.socket.emit("reload-file",{file:file,directory: directory})
  }
}