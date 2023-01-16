import {HttpException, HttpStatus, Injectable, Scope} from '@nestjs/common';
import MeetingModel from "../models/meeting.model";
import {Subject} from "rxjs";
import DocumentModel from "../models/document.model";
import DirectoryModel from "../models/directory.model";

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
        if (!meeting)
            throw 'Meeting not found.'
        meeting.documents.push(doc);
        this.meetingChanged$.next(id);
    }

    putDirectory(directory: DirectoryModel, fileId: string) {
        const meeting = this.meetings.find(m => m.documents.find(d => d.id === fileId));
        this.putDocument(meeting.id, directory as DocumentModel)
    }

    moveDocument(id: string, position: { x: number; y: number }, rotation: number) {
        const meeting = this.meetings.find(m => m.documents.find(d => d.id === id));
        if (!meeting)
            throw 'Meeting not found.'
        const document = meeting.documents.find(d => d.id === id)!;
        document.position = position;
        document.rotation = rotation;
        this.meetingChanged$.next(meeting.id);
    }

    duplicateDocument(source: string, position: { x: number, y: number }, rotation: number) {
        const meeting = this.meetings.find(m => m.documents.find(d => d.id === source));
        if (!meeting)
            throw 'Meeting not found.'
        const document = meeting.documents.find(d => d.id === source)!;

        meeting.documents.push(Object.assign({}, document, {
            id: Math.random().toString(36).substring(7),
            position,
            rotation
        }));
        this.meetingChanged$.next(meeting.id);
    }

    deleteDocument(id: string) {
        const meeting = this.meetings.find(m => m.documents.find(d => d.id === id));
        if (!meeting)
            throw 'Meeting not found.'
        meeting.documents = meeting.documents.filter(d => d.id !== id);
        this.meetingChanged$.next(meeting.id);
    }

    deleteDocumentByName(name: string) {
        const meeting = this.meetings.find(m => m.documents.find(d => d.name === name));
        if (!meeting)
            throw 'Meeting not found.'
        meeting.documents = meeting.documents.filter(d => d.name !== name);
        this.meetingChanged$.next(meeting.id);
    }

    sendToDirectory(file: DocumentModel, directory: DirectoryModel) {
        const meeting = this.meetings.find(m => m.documents.find(d => d.id === file.id));
        const fileToAdd = meeting.documents.find(f => f.id===file.id)
        fileToAdd.parent = directory.name;
        fileToAdd.path = directory.path + directory.name + "/" + file.path;
        (meeting.documents.find(f => f.id===directory.id) as DirectoryModel).files.push(fileToAdd);
        this.meetingChanged$.next(meeting.id);

    }

    reloadFile(file: DocumentModel, directory: DirectoryModel) {
        const meeting = this.meetings.find(m => m.documents.find(d => d.id === file.id));
        const fileToLoad = meeting.documents.find(f => f.id===file.id)
        fileToLoad.parent = undefined;
        fileToLoad.path = "./files/" + file.path.split('/').at(-1);
        fileToLoad.position=directory.position;
        (meeting.documents.find(f => f.id===directory.id) as DirectoryModel).files = (meeting.documents.find(f => f.id===directory.id) as DirectoryModel).files.filter(file => file.id!==fileToLoad.id);
        this.meetingChanged$.next(meeting.id);
    }

    setDocumentOwner(id: string, owner: string) {
        console.log("Looking for the document ", id, " in the meetings ", this.meetings);
        const document = this.meetings.find(m => m.documents.find(d => d.id === id))?.documents.find(d => d.id === id);
        if(!document)
            throw new HttpException("Document not found", HttpStatus.NOT_FOUND);
        document.user = owner;
    }
}
