import {Component, Input} from '@angular/core';
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

  userStandWidth : number =400;
  userStandHeight : number=200;

  centerX: number = 0; 
  centerY: number = 0; 
  mousedown(){
    document.addEventListener('touchmove', (event) => {
      this.dragging({x: event.touches[0].clientX, y: event.touches[0].clientY});
    });
    document.addEventListener('touchend', () => {
      this.stick();
      this.center();
    });
  }
  private dragging(position: { x: number, y: number } = {x: 0, y: 0}) {
      this.user.location.x = position.y-this.userStandHeight/2;
      this.user.location.y = position.x-this.userStandWidth/2;
      this.center();
      this.rotate();
  }
  private stick(){
  switch(this.user.rotation){
    case 0: 
      this.user.location.x= window.innerHeight- this.userStandHeight;
    break;
    case 90: 
      this.user.location.y= -this.userStandHeight/2;
    break;
    case -90: 
      this.user.location.y= window.innerWidth-this.userStandWidth + this.userStandHeight/2;
    break;
    case 180: 
      this.user.location.x= 0;
    break;
  }
  }
  private getNearestBorder(){
    var center = this.center();
        var distBorder = [
          center.y, // top 
          window.innerHeight - center.y,//bot
          center.x,//left
          window.innerWidth - center.x//right
        ]; 
    var nearestBorder = distBorder.indexOf( Math.min(...distBorder))
    console.log("Nearest border [%s]is %d",distBorder.toString(), nearestBorder);
    return nearestBorder;
  }
  get username() {
    return this.user.user.name;
  }

  get rotation() {
    return this.user.rotation;
  }
  center(){
    console.log("Screen DImension: [%d,%d]", window.innerWidth,window.innerHeight)
    var center = {y: this.user.location.x+this.userStandHeight/2, x : this.user.location.y+this.userStandWidth/2}
    this.centerX = center.x;
    this.centerY = center.y;
    return center;
  }
  rotate(){
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
}
