import { Module } from '@nestjs/common';
import { MeetingController } from './meeting/meeting.controller';
import { MeetingService } from './meeting/meeting.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { DocumentController } from './document/document.controller';

@Module({
  controllers: [MeetingController, UserController, DocumentController],
  providers: [MeetingService, UserService]
})
export class CoreModule {}
