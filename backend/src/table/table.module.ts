import { Module } from '@nestjs/common';
import { TableGateway } from './socket/table.gateway';
import { CoreModule } from "../core/core.module";
import { MeetingService } from "../core/meeting/meeting.service";
import { TableService } from './table/table.service';
import { SessionService } from "../core/session/session.service";
import { SpotService } from './spot/spot.service';
import {DocumentService} from "../core/document/document.service";

@Module({
  controllers: [],
  imports: [CoreModule],
  providers: [TableGateway, MeetingService, TableService, SessionService, SpotService, DocumentService
  ]
})
export class TableModule {}
