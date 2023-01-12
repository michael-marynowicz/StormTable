import {Injectable} from '@angular/core';
import {io} from "socket.io-client";
import {hostname} from "./server.config";
import {BehaviorSubject} from "rxjs";
import {ElementType} from "../models/brainstorm-element.model";
import DirectoryModel from "../models/directory.model";
import {MeetingService} from "./meeting.service";
import {HttpClient} from "@angular/common/http";
import DocumentModel from "../models/document.model";

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  socket = io(`http://${hostname}:3000`)

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
      files: []
    }
    file.path = dir.path + '/' + dir.name + "/" + file.name;
    file.parent = dir.name;
    this.directory.push(dir)
    this.directory$.next(this.directory);
    dir.files.push(file)
    await this.httpClient.post(`http://${hostname}:3000/directory/create`, {directory: dir, fileId: file.id}).subscribe()
  }

}
