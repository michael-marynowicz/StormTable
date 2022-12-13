import {Component, Input} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {UserSession} from "../../models/user-session";
import {transform} from "../../../utils/style.utils";
import {fromPosition} from "../../models/viewport.model";

@Component({
  selector: 'app-user-stand',
  templateUrl: './user-stand.component.html',
  styleUrls: ['./user-stand.component.less']
})
export class UserStandComponent {
  @Input() user!: UserSession;

  get positionStyle() {
    return transform(fromPosition(this.user.location.x, this.user.location.y))
  }

  get username() {
    return this.user.user.name;
  }
}
