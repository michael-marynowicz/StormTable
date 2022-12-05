import { Module } from '@nestjs/common';
import { MeetingController } from './meeting/meeting.controller';
import { MeetingService } from './meeting/meeting.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { DocumentController } from './document/document.controller';
import {DownloadController} from "./download/download/download.controller";
import {DownloadService} from "./download/download/download.service";

@Module({
  controllers: [MeetingController, UserController, DocumentController, DownloadController],
  providers: [MeetingService, UserService, DownloadService]
})
export class CoreModule {}
