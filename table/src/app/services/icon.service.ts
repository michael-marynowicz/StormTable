import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(private httpClient : HttpClient ) { }

  load(src: string) {
    console.log("ok")
    return this.httpClient.get(src)

  }
}
