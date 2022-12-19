import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
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
        const doc: DocumentModel = {
            id: get_uid(),
            name: file.originalname,
            type: file.path.endsWith(".pdf") ? ElementType.PDF : ElementType.PICTURE,
            path: file.path,
            position: {x: 600, y: 300}
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
