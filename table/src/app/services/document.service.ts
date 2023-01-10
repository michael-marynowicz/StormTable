import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import DocumentModel from "../models/document.model";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private documents: DocumentModel[] = [];
  documents$ = new BehaviorSubject<string[]>(this.documents.map(d => d.id));
  documentChanged$ = new Subject<DocumentModel>();

  constructor() { }

  inflateDocuments(documents: DocumentModel[]) {
    if(this.documents.length !== documents.length) {
      console.log("Update document ids: ", documents)
      this.documents$.next(documents.map(d => d.id));
    }

    // Update already exists
    const alreadyExists = documents.filter(d => this.documents.find(e => e.id === d.id));
    alreadyExists.forEach(d => this.documentChanged(d));

    this.documents = documents;
  }

  private documentChanged(document: DocumentModel) {
    const existing = this.documents.find(d => d.id === document.id);
    if(!existing) throw new Error("Document not found");
    Object.assign(existing, document);
    this.documentChanged$.next(document);
  }

  getDocument(documentId: string) {
    return this.documents.find(d => d.id === documentId);
  }
}
