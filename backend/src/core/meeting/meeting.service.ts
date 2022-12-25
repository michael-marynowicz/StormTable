import { Injectable } from '@nestjs/common';
import MeetingModel from "../models/meeting.model";
import { Subject } from "rxjs";
import DocumentModel from "../models/document.model";

@Injectable()
export class MeetingService {
  private meetings: MeetingModel[] = [
    {
      id: "e001828e-d107-40d4-aede-bf7d3b32d21f",
      name: "New meeting",
      documents: []
    }
  ]
  meetingChanged$ = new Subject<string>();
  getAll() {
    return this.meetings;
  }

  get(id: string) {
    return this.meetings.find(m => m.id === id);
  }

  getByDocument(documentId: string) {
    return this.meetings.find(m => m.documents.find(d => d.id === documentId));
  }

  putDocument(id: string, doc: DocumentModel) {
    const meeting = this.meetings.find(m => m.id === id)
    if(!meeting)
      throw 'Meeting not found.'
    meeting.documents.push(doc)
    this.meetingChanged$.next(id);
  }

  moveDocument(id: string, position: {x: number; y: number}) {
    const meeting = this.meetings.find(m => m.documents.find(d => d.id === id));
    if(!meeting)
      throw 'Meeting not found.'
    meeting.documents.find(d => d.id === id).position = position;
    this.meetingChanged$.next(id);
  }

  duplicateDocument(source: string, position: { x: number, y: number }) {
    const meeting = this.meetings.find(m => m.documents.find(d => d.id === source));
    if(!meeting)
      throw 'Meeting not found.'
    const document = meeting.documents.find(d => d.id === source)!;

    meeting.documents.push(Object.assign({}, document, { id: Math.random().toString(36).substring(7), position }));
    this.meetingChanged$.next(meeting.id);
  }
}
