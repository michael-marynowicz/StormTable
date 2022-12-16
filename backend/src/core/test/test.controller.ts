import { Controller, Post } from "@nestjs/common";
import { MessageBody } from "@nestjs/websockets";

@Controller('test')
export class TestController {

  @Post()
  testMethod(@MessageBody() body: any) {
    console.log(body);
  }
}
