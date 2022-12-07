import { Injectable } from '@nestjs/common';
import UserModel from "./user.model";

@Injectable()
export class UserService {
  private users: UserModel[] = [
    { id: 'f4e8dbb3-9423-497f-b28c-dd8db6341137', name: 'User 1' },
    { id: 'cc20c698-b458-4ba1-bd11-2ee0b194dc66', name: 'User 2' }
  ];

  getAll() {
    return this.users;
  }

  get(id: string) {
    return this.users.find(u => u.id === id);
  }

  exists(id: string) {
    return !!this.users.find(u => u.id === id)
  }

}
