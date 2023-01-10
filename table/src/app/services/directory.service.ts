import {Injectable} from '@angular/core';
import {io} from "socket.io-client";
import {hostname} from "./server.config";
import {BehaviorSubject} from "rxjs";
import DocumentModel from "../models/document.model";
import {ElementType} from "../models/brainstorm-element.model";

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  socket = io(`http://${hostname}:3000`)

  directory$ = new BehaviorSubject<DocumentModel[]>([]);
  directory : DocumentModel[] = [];
  constructor() { }

  createDirectory(p: { x: number; y: number }, color: string) {
    this.socket.emit("directory");
    this.directory.push({
      name: "doc"+this.directory.length,
      path: "./files/",
      position: {x: p.x, y: p.y},
      rotation: 0,
      type: ElementType.DOC,
      id:"doc"+this.directory.length,
      color: color
    })
    this.directory$.next(this.directory)
  }
}
