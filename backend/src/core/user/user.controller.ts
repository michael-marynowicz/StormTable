import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get()
  getAll() {
    return this.userService.getAll()
  }

  @Post('auth')
  auth(@Body() body: { id: string }) {

  }
}
