import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableModule } from './table/table.module';import { CoreModule } from './core/core.module';

@Module({
  imports: [TableModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
