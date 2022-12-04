import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import MeetingModel from "../models/meeting.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private meetings: MeetingModel[] = []
  subject = new BehaviorSubject<MeetingModel[]>([]);

  constructor(private http: HttpClient) { }

  async fetchAll() {
    return new Promise((resolve, reject) => this.http.get<MeetingModel[]>("http://localhost:3000/meeting").subscribe((v) => {
      this.meetings = v;
      this.subject.next(this.meetings);
      resolve(null)
    }));
  }

  async getAll() {
    return this.meetings;
  }
}
