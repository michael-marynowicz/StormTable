import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableModule } from './table/table.module';
import { CoreModule } from './core/core.module';
import { ClientModule } from './client/client.module';
import {DocumentGateway} from "./core/document/document.gateway";
import {DirectoryGateway} from "./core/directory/directory.gateway";

@Module({
  imports: [TableModule, CoreModule, ClientModule,DocumentGateway,DirectoryGateway],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
