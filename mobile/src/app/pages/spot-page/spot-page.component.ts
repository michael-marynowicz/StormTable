import { Component, OnInit } from '@angular/core';
import UserModel from "../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-spot-page',
  templateUrl: './spot-page.component.html',
  styleUrls: ['./spot-page.component.less']
})
export class SpotPageComponent implements OnInit {

  private spotId?: string;

  constructor(aroute: ActivatedRoute, private authService: UserService, private router: Router) {
    aroute.params.subscribe((_) => {
      this.spotId = aroute.snapshot.params['spotId']
    })
  }

  ngOnInit(): void {
  }

  authenticate(user: UserModel) {
    if(!this.spotId) return;
    this.authService.auth(this.spotId, user.id).then(() => {
      this.router.navigate(['success'])
    })
  }
}
