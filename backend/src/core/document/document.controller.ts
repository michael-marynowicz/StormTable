import {
    Controller, Delete,
    Get, Headers,
    HttpException,
    HttpStatus,
    Param,
    Post, Put,
    UploadedFiles,
    UseInterceptors
} from "@nestjs/common";
import {FilesInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import DocumentModel from "../models/document.model";
import {v4 as get_uid} from "uuid";
import {ElementType} from "../models/element-types-enum";
import {Socket} from "socket.io";
import {ConnectedSocket, MessageBody} from "@nestjs/websockets";
import {SessionService} from "../session/session.service";
import {MeetingService} from "../meeting/meeting.service";
import aggregateDocument from "./aggregateDocument";


@Controller("document")
export class DocumentController {
    constructor(private readonly meetingService: MeetingService, private sessionService: SessionService) {
    }

    @Post("upload")
    @UseInterceptors(FilesInterceptor('files', undefined, {
        storage: diskStorage({
            destination: "./files",
            filename: (req, file, cb) => {
                let extArray = file.mimetype.split("/");
                let extension = extArray[extArray.length - 1];
                cb(null, file.fieldname + "-" + Date.now() + "." + extension);
            }
        })
    }))
    async save(@UploadedFiles() files, @Headers('user') user: string, @ConnectedSocket() socket: Socket): Promise<any> {
        const session = this.sessionService.getSessionByUser(user);
        if (!session)
            throw "Session not found";

        const position = session?.users.find(u => u.id === user)?.location || {x: 0, y: 0};
        const rotation = session?.users.find(u => u.id === user)?.rotation * Math.PI / 180 || 0;

        const docs: DocumentModel[] = files.map((file, i) => {
            return {
                id: get_uid(),
                name: file.originalname,
                type: file.path.endsWith(".pdf") ? ElementType.PDF : ElementType.PICTURE,
                path: file.path,
                position: {
                    x: position.y + i * 10,
                    y: position.x + i * 10
                },
                rotation: rotation,
                parent: undefined,
            };
        })

        this.meetingService.putDocuments(session.meeting.id, docs);

        return;
    }

    @Get(":id")
    getDocumentById(@Param() params: { id: string }): DocumentModel {
        const file = this.meetingService.getByDocument(params.id)?.documents.find(d => d.id === params.id);
        if (!file)
            throw new HttpException("File not found.", HttpStatus.NOT_FOUND);
        return aggregateDocument(file);

    }

    @Delete(":id")
    deleteFileById(@Param("id") id: string) {
        try {
            this.meetingService.deleteDocument(id);
        } catch (e) {
            throw new HttpException("File not found.", HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id/rename')
    renameFile(@Param('id') id: string, @MessageBody() body: { name: string }) {
        this.meetingService.renameDocument(id, body.name);
    }

}
