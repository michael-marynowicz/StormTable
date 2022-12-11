import {
    Controller,
    Get,
    HttpException, HttpStatus,
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
import {DocumentTypes} from "../models/document-types.enum";


@Controller('document')
export class DocumentController {

    constructor(private readonly documentService: DocumentService) {}



    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './files',
            filename: (req, file, cb) => {
                console.log(file,file.fieldname,"<------------")
                let extArray = file.mimetype.split("/");
                let extension = extArray[extArray.length - 1];
                cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
            }
        })
    }))

    async save(@UploadedFile() file) : Promise<any>{
        console.log(file);
        const doc: DocumentModel = {
            id: get_uid(),
            name: file.name,
            type: DocumentTypes.PICTURE,
            path: file.path
        };
        console.log(doc);
        this.documentService.addFile(doc);
        return
    }

    /*@Get('streamable')
    streamable(@Res({ passthrough: true }) response: Response) {
        const file = this.documentService.fileStream();
        return new StreamableFile(file);
    }*/

    @Get('files')
    getListOfFiles(){
        return this.documentService.getAllFiles();
    }

    @Get(':id')
    getDocument(@Param() params: { id: string }) {
        const path = this.documentService.getAllFiles().find(d => d.id === params.id)?.path;
        if(!path)
            throw new HttpException('File not found.', HttpStatus.NOT_FOUND)
        console.log(path)

        const file = this.documentService.fileStream(path);
        return new StreamableFile(file); // 👈 supports Buffer and Stream

    }

}
