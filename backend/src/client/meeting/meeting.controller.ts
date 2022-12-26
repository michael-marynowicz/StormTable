import { Controller, Get, HttpException, Param } from "@nestjs/common";
import { SessionService } from "../../core/session/session.service";

@Controller('meeting')
export class MeetingController {
  constructor(private sessionService: SessionService) {
  }

  @Get('by_user/:userId')
  getMeetingByUser(@Param() params: { userId: string }) {
    const meeting = this.sessionService.getMeetingByUser(params.userId);
    if(!meeting)
      throw new HttpException("This user isn't in a meeting", 404);
    return meeting;
  }
}
