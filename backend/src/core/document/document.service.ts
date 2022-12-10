import { Injectable } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';
import * as path from 'path';
import MeetingModel from "../models/meeting.model";
import DocumentModel from "../models/document.model";

@Injectable()
export class DocumentService {

    private files: DocumentModel[] = []

    constructor() {
        // create connection to your file storage
    }

    fileStream(myPath: string) {
        //const filePath = path.join(process.cwd(), 'package.json')
        const filePath = path.resolve(myPath);
        return createReadStream(filePath);
    }

    addFile(value: DocumentModel){
        this.files.push(value);
    }

    getAllFiles(){
        console.log(this.files);
        return this.files;
    }

}
