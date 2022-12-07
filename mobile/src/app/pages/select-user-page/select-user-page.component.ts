import {Component, OnDestroy, OnInit} from '@angular/core';
import UserModel from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-select-user-page',
  templateUrl: './select-user-page.component.html',
  styleUrls: ['./select-user-page.component.less']
})
export class SelectUserPageComponent implements OnInit, OnDestroy {

  users: UserModel[] = []
  subs?: Subscription;
  constructor(private userService: UserService) {
    this.subs = this.userService.users$.subscribe((values) => this.users = values);
  }

  ngOnInit(): void {
    this.userService.fetchAll().then(() => {})
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe()
  }

}
