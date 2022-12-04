import { Injectable } from '@nestjs/common';
import MeetingModel from "../models/meeting.model";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class MeetingService {
  private meetings: MeetingModel[] = [
    {
      id: "e001828e-d107-40d4-aede-bf7d3b32d21f",
      name: "New meeting",
      documents: []
    }
  ]
  subject: BehaviorSubject<{ meetingId: string|undefined }> = new BehaviorSubject<{ meetingId: string|undefined }>({ meetingId: undefined });

  getAll() {
    return this.meetings;
  }

  get(id: string) {
    return this.meetings.find(m => m.id === id);
  }
}
