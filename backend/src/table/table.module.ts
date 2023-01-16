import { Module } from '@nestjs/common';
import { TableGateway } from './socket/table.gateway';
import { CoreModule } from "../core/core.module";
import {MeetingService} from "../core/meeting/meeting.service";

@Module({
  controllers: [],
  imports: [CoreModule],
  providers: [TableGateway]
})
export class TableModule {}
