import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import UserModel from "../../models/user.model";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.less']
})
export class SelectUserComponent implements OnInit, OnDestroy {
  users: UserModel[] = []
  subs?: Subscription;

  @Output() userSelected = new EventEmitter<UserModel>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.users$.subscribe(u => this.users = u)
    this.userService.fetchAll()
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe()
  }

}
