import {Controller, Get, Headers, HttpException, Param} from "@nestjs/common";
import { SessionService } from "../../core/session/session.service";
import MeetingModel from "../../core/models/meeting.model";
import {MeetingService} from "../../core/meeting/meeting.service";
import SessionNotFoundError from "../../core/errors/session-not-found.error";
import MeetingNotFound from "../../core/errors/meeting-not-found.error";
import {MessageBody} from "@nestjs/websockets";

@Controller('meeting')
export class MeetingController {
  constructor(private sessionService: SessionService, private meetingService: MeetingService) {
  }

  @Get('by_user/:userId')
  getMeetingByUser(@Param() params: { userId: string }) {
    const meeting = this.sessionService.getMeetingByUser(params.userId);
    if(!meeting)
      throw new HttpException("This user isn't in a meeting", 404);
    return meeting;
  }

  @Get('current/files')
  getCurrentMeetingFiles(@Headers('user') user: string) {
    const session = this.sessionService.getSessionByUser(user);
    if(!session)
      throw SessionNotFoundError();

    const meeting = this.meetingService.get(session.meeting.id)
    if(!meeting)
      throw MeetingNotFound();

    return meeting.documents;
  }

  @Get(':id/files')
  getMeetingFiles(@Param('id') id: string) {
    return this.meetingService.get(id).documents;
  }
}
