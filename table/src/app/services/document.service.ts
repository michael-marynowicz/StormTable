import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import DocumentModel from "../models/document.model";
import {HttpClient} from "@angular/common/http";
import {hostname} from "./server.config";
import DirectoryModel from "../models/directory.model";
import {DirectoryService} from "./directory.service";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private documents: DocumentModel[] = [];
  documents$ = new BehaviorSubject<string[]>(this.documents.map(d => d.id));
  documentChanged$ = new Subject<DocumentModel>();

  constructor(private httpClient:HttpClient) { }

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

  async moveFile(file: DocumentModel, directory: DirectoryModel) {
    file.path = directory.path;
    console.log(directory,"before", Object.assign({}, file))
    directory.files.push( Object.assign({}, file));
    console.log(directory,"after")
    await this.httpClient.delete(`http://${hostname}:3000/document/${file.id}`).subscribe() //TODO ne pas supprimer

  }
}
