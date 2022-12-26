import {Injectable} from '@nestjs/common';
import {createReadStream} from 'fs';
import * as path from 'path';
import DocumentModel from "../models/document.model";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class DocumentService {
    private files: DocumentModel[] = []
    public files$ = new BehaviorSubject<DocumentModel[]>([])

    constructor() {
    }

    fileStream(myPath: string) {
        //const filePath = path.join(process.cwd(), 'package.json')
        const filePath = path.resolve(myPath);
        return createReadStream(filePath);
    }

    addFile(value: DocumentModel) {
        this.files.push(value);
        this.files$.next(this.files);
    }

    getAllFiles() {
        return this.files;
    }

    deleteFile(file : DocumentModel){
        console.log("ca marche")
        const index = this.files.indexOf(file)
        this.files.splice(index,1)
    }

}
