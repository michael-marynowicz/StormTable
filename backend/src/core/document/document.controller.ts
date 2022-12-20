import {Controller, Get, HttpException, HttpStatus, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {DocumentService} from "./document.service";
import DocumentModel from "../models/document.model";
import {v4 as get_uid} from 'uuid'
import {ElementType} from "../models/element-types-enum";
import {Socket} from "socket.io";
import {ConnectedSocket} from "@nestjs/websockets";


@Controller('document')
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './files',
            filename: (req, file, cb) => {
                let extArray = file.mimetype.split("/");
                let extension = extArray[extArray.length - 1];
                cb(null, file.fieldname + '-' + Date.now() + '.' + extension)
            }

        })

    }))
    async save(@UploadedFile() file, @ConnectedSocket() socket: Socket): Promise<any> {
        let fileType: ElementType;
        if(file.path.endsWith(".pdf")){
            fileType = ElementType.PDF;
        }
        else if(file.path.endsWith(".pptx")){
            fileType = ElementType.PPTX;
        }
        else if(file.path.endsWith(".png") || file.path.endsWith(".jpeg") || file.path.endsWith(".jpg")){
            fileType = ElementType.PICTURE;
        }
        else if(file.path.endsWith(".txt")){
            fileType = ElementType.TXT;
        }
        const doc: DocumentModel = {
            id: get_uid(),
            name: file.originalname,
            type: fileType,
            path: file.path,
            position: {x: 0, y: 0}
        };
        this.documentService.addFile(doc);

        /// TODO: Detect if the user is in a meeting and update this meeting

        return;
    }

    @Get('files')
    getListOfFiles() {
        return this.documentService.getAllFiles();
    }

    @Get(':id')
    getDocumentById(@Param() params: { id: string }): DocumentModel {
        const file = this.documentService.getAllFiles().find(d => d.id === params.id);
        if (!file)
            throw new HttpException('File not found.', HttpStatus.NOT_FOUND)
        return file;

    }
}
