import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {io} from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class DropZoneService {
  socket = io("http://localhost:3000")

  constructor(private httpClient : HttpClient) { }

  async sendFile(file: File) {
    const data = new FormData();
    data.append("file",file);
    await this.httpClient.post("http://localhost:3000/document/upload",data).subscribe(_ => {
      this.socket.emit('document')
    })
    console.log("file send to server")
  }
}
