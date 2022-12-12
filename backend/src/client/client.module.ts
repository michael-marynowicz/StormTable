import { Module } from '@nestjs/common';
import { ClientGateway } from './socket/client.gateway';
import { MobileController } from './mobile/mobile.controller';
import { ClientService } from './client/client.service';
import { CoreModule } from "../core/core.module";
import { SessionService } from "../core/session/session.service";

@Module({
  imports: [CoreModule],
  providers: [ClientGateway, ClientService, SessionService],
  controllers: [MobileController]
})
export class ClientModule {}
