import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DropZoneService {

  constructor(private httpClient : HttpClient) { }

  sendFile(file: File) {
    const data = new FormData();
    data.append("file",file);
    this.httpClient.post("http://localhost:3000/document/upload",data).subscribe(_ => {})

  }
}
