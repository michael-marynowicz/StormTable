import {
    Controller, Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
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
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: "./files",
            filename: (req, file, cb) => {
                let extArray = file.mimetype.split("/");
                let extension = extArray[extArray.length - 1];
                cb(null, file.fieldname + "-" + Date.now() + "." + extension);
            }

        })

    }))
    async save(@UploadedFile() file, @MessageBody() body: { user: string }, @ConnectedSocket() socket: Socket): Promise<any> {
        const session = this.sessionService.getSessionByUser(body.user);
        if (!session)
            throw "Session not found";

        const position = session?.users.find(u => u.id === body.user)?.location || {x: 0, y: 0};

        const doc: DocumentModel = {
            id: get_uid(),
            name: file.originalname,
            type: file.path.endsWith(".pdf") ? ElementType.PDF : ElementType.PICTURE,
            path: file.path,
            position: position,
            rotation: 0,
            parent: undefined,
        };

        this.meetingService.putDocument(session.meeting.id, doc);

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

}
