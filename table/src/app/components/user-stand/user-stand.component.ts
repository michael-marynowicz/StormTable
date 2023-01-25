import {Component, Input, OnInit} from '@angular/core';
import { UserSession } from "../../models/user-session";
import { transform } from "../../../utils/style.utils";
import { fromPosition } from "../../models/viewport.model";
import SessionService from "../../services/session.service";

@Component({
  selector: 'app-user-stand',
  templateUrl: './user-stand.component.html',
  styleUrls: ['./user-stand.component.less']
})
export class UserStandComponent implements OnInit{
  @Input() user!: UserSession;

  userStandWidth: number = 800;
  userStandHeight: number = 650;

  onDrag: Boolean = false;
  centerX: number = 0;
  centerY: number = 0;

  constructor(private sessionService: SessionService) {
  }

  onmouseDown(event: TouchEvent) {

    var touchPoint = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    if (this.isPointInside(touchPoint))
      this.onDrag = true;
    if (this.onDrag) {
      this.dragging({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    }
  }
  onMouseUp(event: Event) {
    if (this.onDrag) {
      this.onDrag = false;
      this.stick();
      // Sync with server
      this.sessionService.setUserPosition(this.user.id, this.user.location, this.user.rotation);

    }
  }
  private dragging(position: { x: number, y: number } = { x: 0, y: 0 }) {
    this.user.location.x = position.y - this.userStandHeight / 2;
    this.user.location.y = position.x - this.userStandWidth / 2;
    this.center();
    this.rotate();
  }
  private stick() {
    switch (this.user.rotation) {
      case 0:
        this.user.location.x = window.innerHeight - this.userStandHeight;
        break;
      case 90:
        this.user.location.y = -this.userStandWidth / 2 + this.userStandHeight / 2;//this.userStandWidth;
        break;
      case -90:
        this.user.location.y = window.innerWidth - this.userStandHeight;
        break;
      case 180:
        this.user.location.x = 0;
        break;
    }
  }
  private isPointInside(point: { x: number, y: number }) {
    var center = this.center();
    if (Math.abs(this.user.rotation) == 90) {//vertical box
      console.log("vertical box ")
      return (
        point.x <= (center.x + this.userStandHeight / 2) &&
        point.x >= (center.x - this.userStandHeight / 2) &&
        point.y <= (center.y + this.userStandWidth / 2) &&
        point.y >= (center.y - this.userStandWidth / 2)
      )

    } else {//horizontal box
      console.log("Horizontal box ")
      return (
        point.x <= (center.x + this.userStandWidth / 2) &&
        point.x >= (center.x - this.userStandWidth / 2) &&
        point.y <= (center.y + this.userStandHeight / 2) &&
        point.y >= (center.y - this.userStandHeight / 2)
      )

    }

  }
  private getNearestBorder() {
    var center = this.center();
    var distBorder = [
      center.y, // top
      window.innerHeight - center.y,//bot
      center.x,//left
      window.innerWidth - center.x//right
    ];
    var nearestBorder = distBorder.indexOf(Math.min(...distBorder))
    console.log("Nearest border [%s]is %d", distBorder.toString(), nearestBorder);
    return nearestBorder;
  }
  get username() {
    return this.user.user.name;
  }

  get rotation() {
    return this.user.rotation;
  }
  center() {
    var center = { y: this.user.location.x + this.userStandHeight / 2, x: this.user.location.y + this.userStandWidth / 2 }
    this.centerX = center.x;
    this.centerY = center.y;
    return center;
  }
  rotate() {
    switch (this.getNearestBorder()) {
      case 0://top
        console.log("orient top")
        this.user.rotation = 180;
        break;
      case 1://bot
        console.log("orient bot")
        this.user.rotation = 0;
        break;
      case 2://left
        console.log("orient left")
        this.user.rotation = 90;
        break;
      case 3://right
        console.log("orient right")
        this.user.rotation = -90;
        break;
    }
  }

  ngOnInit(): void {
    this.sessionService.session$.subscribe(_ => {
      this.stick();
      this.rotate();
    })
  }
}
