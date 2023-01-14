import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MeetingModel} from "../models/meeting.model";
import {serverHostname} from "./host.config";
import {UserService} from "./user.service";
import {DocumentModel} from "../models/document.model";

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
      .get<MeetingModel>(`{main}/meeting/by_user/${currentUser}`)
      .toPromise();
    if(!this._meeting)
      throw 'Fail to fetch meeting.'
    return this.meeting;
  }

  async getMeetings(): Promise<MeetingModel[]> {
    return this.http.get<MeetingModel[]>("{main}/meeting").toPromise().then(meetings => {
      if(!meetings)
        return [];
      return meetings;
    });
  }

  async getImplications(): Promise<MeetingModel[]> {
    return this.http.get<MeetingModel[]>("{main}/meeting/implications").toPromise().then(meetings => {
      console.log("Fetched meetings: ", meetings)
      if(!meetings)
        return [];
      return meetings;
    })
  }

  async uploadFile(files: File[]) {
    const data = new FormData();
    files.forEach(file => data.append("file",file));
    data.append('user', this.userService.currentUser!.id);
    await this.http.post(`{main}/document/upload`,data).toPromise();
  }

  getDocuments(meeting: MeetingModel, parent: string|undefined = undefined): DocumentModel[] {
    return meeting.documents.filter(d => d.parent === parent);
  }

  async getDocumentInMeeting(meeting: string): Promise<DocumentModel[]> {
    return this.http.get<DocumentModel[]>(`{main}/meeting/${meeting}/files`).toPromise().then(documents => {
      if(!documents)
        return []
      return documents;
    })
  }

  getMeeting(meetingId: string) {
    return this.http.get<MeetingModel>('{main}/meeting/' + meetingId).toPromise().then(meeting => {
      if(!meeting)
        throw "Meeting not found.";
      return meeting;
    });
  }
}
