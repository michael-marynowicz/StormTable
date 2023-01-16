import { Module } from '@nestjs/common';
import { ClientGateway } from './socket/client.gateway';
import { MobileController } from './mobile/mobile.controller';
import { ClientService } from './client/client.service';
import { CoreModule } from "../core/core.module";
import { MeetingController } from './meeting/meeting.controller';
import { DocumentController } from './document/document.controller';

@Module({
  imports: [CoreModule],
  providers: [ClientGateway, ClientService],
  controllers: [MobileController, MeetingController, DocumentController]
})
export class ClientModule {}
