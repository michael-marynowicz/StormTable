import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import UserModel from "../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  private then?: string;

  constructor(private userService: UserService, aroute: ActivatedRoute, private router: Router) {
    aroute.queryParams.subscribe(_ => {
      const snapshot = aroute.snapshot;
      this.then = snapshot.queryParamMap.get('then') || undefined;
    })
  }

  async login($event: UserModel) {
    this.userService.login($event)
    console.log(this.then)
    await this.router.navigate([this.then || '/']);
  }
}