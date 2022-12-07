import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableModule } from './table/table.module';import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [TableModule, CoreModule, UserModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
