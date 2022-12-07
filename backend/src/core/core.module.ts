import { Module } from '@nestjs/common';
import { MeetingController } from './meeting/meeting.controller';
import { MeetingService } from './meeting/meeting.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { SessionService } from './session/session.service';
import { SessionController } from './session/session.controller';

@Module({
  controllers: [MeetingController, UserController, SessionController],
  providers: [MeetingService, UserService, SessionService]
})
export class CoreModule {}
