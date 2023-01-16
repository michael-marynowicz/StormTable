import { Injectable } from '@angular/core';
import UserModel from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  currentUser?: UserModel;

  constructor() {
    this.currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : undefined;
  }

  login(user: UserModel) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser = user;
  }
}
