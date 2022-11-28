import { Module } from '@nestjs/common';
import { SocketGateway } from './socket/socket.gateway';
import { InitController } from './init/init.controller';
import { RepositoryService } from './repository/repository.service';

@Module({
  controllers: [InitController],
  providers: [SocketGateway, RepositoryService]
})
export class TableModule {}
