import {Controller, Get, Headers, Param} from "@nestjs/common";
import {MeetingService} from "./meeting.service";
import {SessionService} from "../session/session.service";
import aggregateMeeting from "./aggregateMeeting";

@Controller('meeting')
export class MeetingController {
  constructor(private meetingService: MeetingService, private sessionService: SessionService) {
  }

  @Get()
  getAll() {
    return this.meetingService.getAll();
  }
  @Get("implications")
  getImplications(@Headers('user') user: string) {
    console.log("Get implication, user: ", user)
    const sessions = this.sessionService.getAllSessionsByUser(user);
    return sessions
        .map(s => this.meetingService.get(s.meeting.id))
        .map(m => aggregateMeeting(m));
  }

  @Get(":id")
  get(@Param() params: { id: string }) {
    console.log("Get meeting: ", params.id)
    return aggregateMeeting(this.meetingService.get(params.id));
  }


}
