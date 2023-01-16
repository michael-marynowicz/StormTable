import {Component, Input} from '@angular/core';
import {UserSession} from "../../models/user-session";
import {transform} from "../../../utils/style.utils";
import {fromPosition} from "../../models/viewport.model";
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { UserSessionDto } from '../../../../../backend/src/core/models/session/dto/session.dto';

@Component({
  selector: 'app-user-stand',
  templateUrl: './user-stand.component.html',
  styleUrls: ['./user-stand.component.less']
})
export class UserStandComponent {
  @Input() user!: UserSession;

  userStandWidth  = 400; 
  userStandHeight  = 400; 
  _moveable=true;
  hold=false;
  get sizeStyle(){
    return "30"
  }
  get username() {
    return this.user.user.name;
  }

  get rotation() {
    return this.user.rotation
  }

 rotatePersonalSpace(posX: number, posY: number) {
  var curCenter = this.getCenter();
  console.log("dimension screen x,y: "+window.innerWidth+ ", "+ window.innerHeight)
    var distBorder = [curCenter.y, window.innerHeight - curCenter.y, curCenter.x, window.innerWidth - curCenter.x]; // top,bot,left,right
  console.log("rotate"+distBorder);
    var minDistBorder = Math.min(...distBorder);
    var nearestBorder = distBorder.indexOf(minDistBorder);
  console.log("rotate"+nearestBorder);
    switch (nearestBorder) {
      case 2://top
        console.log("orient top")
        if(this.user.rotation!=180)
          this.user.location.x+=this.userStandWidth
        this.user.rotation = 180;
        break;
      case 3://bot
        console.log("orient bot")
        if(this.user.rotation!=0)
          this.user.location.x-=this.userStandWidth
        this.user.rotation = 0;
        break;
      case 0://left
        console.log("orient left")
        if(this.user.rotation!=90)
          this.user.location.y-=this.userStandWidth
        this.user.rotation = 90;
        break;
      case 1://right
        console.log("orient right")
        if(this.user.rotation!=-90)
          this.user.location.y+=this.userStandWidth
        this.user.rotation = -90;
        break;
    }
    return nearestBorder;
  }
  private dragStart() {
    this.hold = true;
  }
  mousedown(){
    if(this._moveable){
      this.dragStart()
      var oldPositionState = this.user;
           document.addEventListener('touchmove', (event) => {
      this.dragging({x: event.touches[0].clientX, y: event.touches[0].clientY});
    });

    document.addEventListener('touchend', () => {
      this.dragEnd(oldPositionState)
    });
    }
  }
  dragEnd(oldPosition:UserSessionDto) {
    if (!this.hold) return;
    if(true){// resolve conflict{
      this.user=oldPosition;
    this.stickPersonalSpace()
      
    }
    else{
      this.user=oldPosition;

    }
    this.hold = false;
    //this.minimapVisible = false;
  
  }
  private dragging(position: { x: number, y: number } = {x: 0, y: 0}) {
    if (this.hold) {
      console.log("center is : "+this.getCenter().x+","+this.getCenter().y)
      this.user.location.x = position.y - this.userStandHeight/2 ;
      this.user.location.y = position.x - this.userStandWidth/2;
      this.rotatePersonalSpace(this.getCenter().x,this.getCenter().y)
    }
  }

  stickPersonalSpace(){
    var curBorer = this.rotatePersonalSpace(this.user.location.x,this.user.location.y)
    switch(curBorer){
      case 2://top
      console.log("stick top ")
        this.user.location.y= window.innerHeight-this.userStandHeight/4
      break;
      case 3://bot
      console.log("stick bot ")
        this.user.location.y=window.innerHeight-this.userStandHeight/4
      break;
      case 0://left
      console.log("stick left ")
        this.user.location.y=this.userStandHeight/4;

      break;
      case 1://right
      console.log("stick right ")
      this.user.location.x=window.innerWidth-this.userStandHeight/4
      break;
    }
    var center = this.getCenter()
    if(Math.abs(this.user.rotation)==90){// vertical box need do adjust vertically to resolve conflict 
      if(center.y+this.userStandWidth/2>window.innerHeight)
        this.user.location.y=window.innerHeight-this.userStandWidth/2
      else if(center.y-this.userStandWidth/2<0)
        this.user.location.y=this.userStandWidth/2
    }
    else{//horizontal box need to adjust horiznntally 

    }


  }
  getCenter(){// get center of the box, not the top left corner  considering the box rotation 
    var curCenter = { x: this.userStandWidth/2, y: -this.userStandHeight/2}
    var pX,pY=0; 
    var angle = this.user.rotation?this.user.rotation *(Math.PI/180):0;

    pX = curCenter.x*Math.cos(angle)+ curCenter.y*Math.sin(angle)
    pY = curCenter.x * Math.sin(angle)+curCenter.y*Math.cos(angle)
    return {
      x:Math.round(this.user.location.x-pX),
      y:Math.round(this.user.location.y-pY)}
    
  }
}
