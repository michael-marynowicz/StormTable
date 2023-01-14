import { Module } from '@nestjs/common';
import { ClientGateway } from './socket/client.gateway';
import { MobileController } from './mobile/mobile.controller';
import { ClientService } from './client/client.service';
import { CoreModule } from "../core/core.module";
import { MeetingController } from './meeting/meeting.controller';
import {MeetingService} from "../core/meeting/meeting.service";

@Module({
  imports: [CoreModule],
  providers: [ClientGateway, ClientService, MeetingService],
  controllers: [MobileController, MeetingController]
})
export class ClientModule {}
