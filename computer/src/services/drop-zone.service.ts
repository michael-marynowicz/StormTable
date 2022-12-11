import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DropZoneService {

  constructor(private httpClient : HttpClient) { }

  sendFile(file: File) {
    console.log("ici",file)
    this.httpClient.put("upload",file)

  }
}
