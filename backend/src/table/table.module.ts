import { Module } from '@nestjs/common';
import { TableGateway } from './socket/table.gateway';
import { CoreModule } from "../core/core.module";

@Module({
  controllers: [],
  imports: [CoreModule],
  providers: [TableGateway]
})
export class TableModule {}
