import {Controller, Get, Param, Post, Res, StreamableFile, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {Response} from "express";
import {DocumentService} from "./document.service";
import DocumentModel from "../models/document.model";
import {v4 as get_uid} from 'uuid'
import {DocumentTypes} from "../models/document-types.enum";

@Controller('document')
export class DocumentController {

    constructor(private readonly documentService: DocumentService, private readonly documentModel: DocumentModel) {}


    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './files',
            filename:(req, file, cb) => {
                const fileNameSplit = file.originalname.split(".");
                const fileExt = fileNameSplit[fileNameSplit.length-1];
                cb(null, `${Date.now()}.${fileExt}`);
            }
        })
    }))

    async save(@UploadedFile() file) : Promise<any>{
        console.log(file);
        const doc: DocumentModel = {
            id: get_uid(),
            name: file.name,
            type: DocumentTypes.PICTURE,
            path: './files'+ file.name
        };
        this.documentService.addFile(doc);
        return
    }

    /*@Get('streamable')
    streamable(@Res({ passthrough: true }) response: Response) {
        const file = this.documentService.fileStream();
        return new StreamableFile(file);
    }*/

    @Get(':id')
    getDocument(@Param() params: { id: string }) {
        var path = '';
        for (let i = 0; i < this.documentService.getAllFiles().length; i++) {
            if (this.documentService.getAllFiles()[i].id == params.id) {
                path = this.documentService.getAllFiles()[i].path;
            }
        }
        const file = this.documentService.fileStream(path);
        return new StreamableFile(file); // 👈 supports Buffer and Stream

    }

}
