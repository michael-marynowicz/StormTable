import { Injectable } from '@angular/core';
import {io} from "socket.io-client";
import {hostname} from "./server.config";

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  socket = io(`http://${hostname}:3000`)
  constructor() { }

  createDirectory() {
    console.log("ok")
    this.socket.emit("directory");
  }
}
