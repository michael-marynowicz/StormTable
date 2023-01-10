import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MeetingModel} from "../models/meeting.model";
import {serverHostname} from "./host.config";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private _meeting?: MeetingModel;

  private get meeting() {
    if(!this._meeting)
      throw "No meeting set. Please call getCurrentMeeting first";
    return this._meeting!;
  }

  constructor(private http: HttpClient, private userService: UserService) { }

  async getCurrentMeeting() {
    const currentUser = this.userService.currentUser?.id;
    if(!currentUser)
      throw 'User not logged.'
    this._meeting = await this.http
      .get<MeetingModel>(`${serverHostname}/meeting/by_user/${currentUser}`)
      .toPromise();
    if(!this._meeting)
      throw 'Fail to fetch meeting.'
    return this.meeting;
  }

  async uploadFile(files: File[]) {
    const data = new FormData();
    files.forEach(file => data.append("file",file));
    data.append('user', this.userService.currentUser!.id);
    await this.http.post(`${serverHostname}/document/upload`,data).toPromise();
  }
}
