import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-prompt-spot-id',
  templateUrl: './prompt-spot-id.component.html',
  styleUrls: ['./prompt-spot-id.component.less']
})
export class PromptSpotIdComponent implements OnInit {

  disabled = false;
  spotId: string = "";
  authenticating = false;
  authenticated = false;
  unauthorized = false;

  constructor(private userService: UserService, private aroute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  async login() {
    const userId = this.aroute.snapshot.params['userId']
    if(!userId) throw "User not logged."
    this.authenticated = false;
    this.unauthorized = false;
    this.authenticating = true;
    try {
      await this.userService.auth(this.spotId, userId);
      this.authenticated = true;
    } catch (e) {
      this.unauthorized = true;
    }
    this.authenticating = false;
  }
}
