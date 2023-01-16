import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MeetingModel} from "../models/meeting.model";
import {UserService} from "./user.service";
import {DocumentModel} from "../models/document.model";
import {UserSessionService} from "./user-session.service";
import {Socket} from "ngx-socket-io";
import {BehaviorSubject} from "rxjs";
import {SocketGatewayService} from "./socket-gateway.service";

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

  private meetings: MeetingModel[] = [];
  meetings$ = new BehaviorSubject<MeetingModel[]>([]);

  constructor(private http: HttpClient, private userService: UserService, private userSessionService: UserSessionService, socketGatewayService: SocketGatewayService) {
    socketGatewayService.documentChanged$.subscribe((meetingId) => {
      this.getMeeting(meetingId).then(meeting => {
        const oldMeeting = this.meetings.find(meeting => meeting.id === meetingId);
        if(this._meeting && this._meeting.id === meetingId)
          Object.assign(this._meeting, meeting);

        if(oldMeeting) {
          Object.assign(oldMeeting, meeting);
        } else {
          this.meetings.push(meeting);
          this.meetings$.next(this.meetings);
        }
      })
    });

    this.meetings$.subscribe((meetings) => console.log("Meetings: ", meetings));

  }

  async getCurrentMeeting() {
    const currentUser = this.userSessionService.currentUser?.id;
    if(!currentUser)
      throw 'User not logged.'
    this._meeting = await this.http
      .get<MeetingModel>(`{main}/meeting/by_user/${currentUser}`)
      .toPromise();
    if(!this._meeting)
      throw 'Fail to fetch meeting.'

    this.meetings = [...this.meetings.filter(m => m.id !== this._meeting?.id), this._meeting];
    this.meetings$.next(this.meetings);

    return this.meeting;
  }

  async getMeetings(): Promise<MeetingModel[]> {
    return this.http.get<MeetingModel[]>("{main}/meeting").toPromise().then(meetings => {
      if(!meetings)
        return [];

      this.meetings = meetings;
      this.meetings$.next(this.meetings);

      return meetings;
    });
  }

  async getImplications(): Promise<MeetingModel[]> {
    return this.http.get<MeetingModel[]>("{main}/meeting/implications").toPromise().then(meetings => {
      console.log("Fetched meetings: ", meetings)
      if(!meetings)
        return [];

      this.meetings = [...this.meetings.filter(m => !meetings.find(meeting => meeting.id === m.id)), ...meetings];
      this.meetings$.next(this.meetings);

      return meetings;
    })
  }

  async uploadFile(files: File[]) {
    const data = new FormData();
    files.forEach(file => data.append("file",file));
    data.append('user', this.userSessionService.currentUser!.id);
    await this.http.post(`{main}/document/upload`,data).toPromise();
  }

  getDocuments(meeting: MeetingModel, parent: string|undefined = undefined): DocumentModel[] {
    return meeting.documents.filter(document => document.parent === parent) as DocumentModel[];
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

      this.meetings = [...this.meetings.filter(m => m.id !== meetingId), meeting];
      this.meetings$.next(this.meetings);

      return meeting;
    });
  }

}
