import {Controller, Get, Param, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {Observable, of} from "rxjs";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get ("images/:imagename")
  getImage(@Param ('imagename') imagename, @Res () res): Observable<Object> {
    return of(res.sendFile(imagename,{ root: './ressources/img' }));
  }
}
