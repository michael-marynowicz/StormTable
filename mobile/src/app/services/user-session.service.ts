import { Injectable } from '@angular/core';
import UserModel from "../models/user.model";
import {SocketGatewayService} from "./socket-gateway.service";

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  currentUser?: UserModel;

  constructor(private socketGatewayService: SocketGatewayService) {
    this.currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : undefined;
    if(this.currentUser)
      this.socketGatewayService.authenticate(this.currentUser.id);
  }

  login(user: UserModel) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser = user;
    this.socketGatewayService.authenticate(user.id);
  }
}
