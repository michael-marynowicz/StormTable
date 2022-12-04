import { Injectable } from '@nestjs/common';
import UserModel from "../models/user.model";

@Injectable()
export class UserService {
  private users: UserModel[] = [];

  getAll() {
    return this.users;
  }

  get(id: string) {
    return this.users.find(u => u.id === id);
  }

}
