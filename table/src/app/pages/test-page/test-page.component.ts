import {Component} from '@angular/core';
import {UserSession} from "../../models/user-session";

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.less']
})
export class TestPageComponent {
  public userModel: UserSession = {
    id: "user_id",
    user: {
      id: "user_id",
      name: "This is my name"
    },
    location: {
      x: 100, y: 100
    }
  }
}
