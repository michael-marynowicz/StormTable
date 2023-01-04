import {Component, OnDestroy, OnInit} from '@angular/core';
import UserModel from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-user-page',
  templateUrl: './select-user-page.component.html',
  styleUrls: ['./select-user-page.component.less']
})
export class SelectUserPageComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  go(user: UserModel) {
    this.router.navigate(['user', user.id])
  }
}
