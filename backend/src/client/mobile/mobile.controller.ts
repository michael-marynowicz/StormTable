import { Controller, Post } from "@nestjs/common";
import { MessageBody } from "@nestjs/websockets";
import { SessionService } from "../../core/session/session.service";

@Controller('mobile')
export class MobileController {

  constructor(private sessionService: SessionService) {
  }

  @Post('auth')
  auth(@MessageBody() body: { userId: string, spotId: string }) {
    this.sessionService.userJoin(body.userId, body.spotId);
  }
}
