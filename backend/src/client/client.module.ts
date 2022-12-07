import { Module } from '@nestjs/common';
import { ClientGateway } from './socket/client.gateway';

@Module({
  providers: [ClientGateway]
})
export class ClientModule {}
