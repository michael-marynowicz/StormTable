import {Injectable} from '@angular/core';
import {io} from "socket.io-client";
import {BehaviorSubject} from "rxjs";
import {ElementType} from "../models/brainstorm-element.model";
import DirectoryModel from "../models/directory.model";
import {MeetingService} from "./meeting.service";
import {HttpClient} from "@angular/common/http";
import DocumentModel from "../models/document.model";
import {socketDomain} from "../../../domain.config";
import SessionService from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  socket = io(socketDomain);

  directory$ = new BehaviorSubject<DirectoryModel[]>([]);
  directory : DirectoryModel[] = [];

  colors= [
    "#7dff57",
    "#ff284c",
    "#2ddcff",
    "#f2d5ff",
    "#ffc3a7",
    "#fff373",
    "#a25ad6",
    "#ff9215",
    "#335c9a",
    "#b54d1c"
  ];

  constructor(private meetingService: MeetingService,private httpClient: HttpClient,private sessionService : SessionService) { }

  async createDirectory(p: { x: number; y: number }, file: DocumentModel) {
    const dir: DirectoryModel = {
      name: "doc" + "-" + this.getDirectory.length,
      path: "./",
      position: {x: p.x, y: p.y},
      rotation: 0,
      type: ElementType.DIRECTORY,
      id: "doc" + "-" + Date.now(),
      color: ""+(this.getDirectory.length<9 ? this.colors[this.getDirectory.length] : "#"+Math.floor(Math.random() * 16777215).toString(16)),
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

  get getDirectory(){
    return this.sessionService.session?.meeting.meeting.documents.filter(doc =>doc.type==="DIRECTORY") as DirectoryModel[]
  }
}
