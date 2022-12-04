import { Controller, Get, Param } from "@nestjs/common";
import { MeetingService } from "./meeting.service";

@Controller('meeting')
export class MeetingController {
  constructor(private meetingService: MeetingService) {
  }

  @Get()
  getAll() {
    return this.meetingService.getAll();
  }

  @Get(":id")
  get(@Param() params: { id: string }) {
    return this.meetingService.get(params.id);
  }
}
