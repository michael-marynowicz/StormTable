import {Controller, Post} from "@nestjs/common";
import {MessageBody} from "@nestjs/websockets";
import {MeetingService} from "../meeting/meeting.service";
import DirectoryModel from "../models/directory.model";
import {DirectoryService} from "./directory.service";


@Controller("directory")
export class DirectoryController {
    constructor(private readonly directoryService: DirectoryService, private readonly meetingService: MeetingService) {
    }

    @Post("create")
    async createDirectory(@MessageBody() body: { directory: DirectoryModel, fileId: string }): Promise<any> {
        this.meetingService.putDirectory(body.directory, body.fileId)
        this.directoryService.createDirectory(body.directory.path);
        this.meetingService.deleteDocument(body.fileId)

    }
}