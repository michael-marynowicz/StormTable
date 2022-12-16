import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    StreamableFile,
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
export class DocumentController{
    constructor(private readonly documentService: DocumentService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './files',
            filename: (req, file, cb) => {
                let extArray = file.mimetype.split("/");
                let extension = extArray[extArray.length - 1];
                cb(null, file.fieldname + '-' + Date.now()+ '.' + extension)
            }

        })

    }))
    async save(@UploadedFile() file,@ConnectedSocket() socket: Socket) : Promise<any>{
        console.log(file)
        const doc: DocumentModel = {
            id: get_uid(),
            name: file.originalname,
            type: file.path.endsWith(".pdf") ? ElementType.PDF : ElementType.PICTURE,
            path: file.path
        };
        this.documentService.addFile(doc);

        /// TODO: Detect if the user is in a meeting and update this meeting

        return;
    }

    @Get('files')
    getListOfFiles(){
        return this.documentService.getAllFiles();
    }

    @Get(':id')
    getDocument(@Param() params: { id: string }) {
        const path = this.documentService.getAllFiles().find(d => d.id === params.id)?.path;
        if(!path)
            throw new HttpException('File not found.', HttpStatus.NOT_FOUND)
        const file = this.documentService.fileStream(path);
        return new StreamableFile(file); // 👈 supports Buffer and Stream

    }
}
