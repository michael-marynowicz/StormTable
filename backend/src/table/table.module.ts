import { Module } from '@nestjs/common';
import { SocketGateway } from './socket/socket.gateway';
import { CoreModule } from "../core/core.module";
import { MeetingService } from "../core/meeting/meeting.service";
import { TableSessionService } from './table-session/table-session.service';
import { TableService } from './table/table.service';

@Module({
  controllers: [],
  imports: [CoreModule],
  providers: [SocketGateway, MeetingService, TableSessionService, TableService]
})
export class TableModule {}
