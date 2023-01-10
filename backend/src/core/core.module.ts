import { Module } from '@nestjs/common';
import { MeetingController } from './meeting/meeting.controller';
import { MeetingService } from './meeting/meeting.service';
import { UserController } from './user/user.controller';
import { SessionService } from './session/session.service';
import { SessionController } from './session/session.controller';
import { DocumentController } from './document/document.controller';
import { TestController } from './test/test.controller';
import { TableService } from "./table/table.service";
import { UserService } from "./user/user.service";

@Module({
  controllers: [MeetingController, UserController, SessionController,DocumentController, TestController],
  providers: [MeetingService, SessionService, TableService, UserService],
  exports: [SessionService]
})
export class CoreModule {}
