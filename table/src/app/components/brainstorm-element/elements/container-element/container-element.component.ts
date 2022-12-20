import {Component, Input, OnInit} from '@angular/core';
import "hammerjs";
import {ActivatedRoute} from "@angular/router";
import SessionService from "../../../../services/session.service";
import {DocumentService} from "../../../../services/document.service";
import DocumentModel from "../../../../models/document.model";

@Component({
  selector: 'app-container-element',
  templateUrl: './container-element.component.html',
  styleUrls: ['./container-element.component.less']
})

export class ContainerElementComponent {

  @Input() doc!: DocumentModel;
  @Input() edit: boolean = true;

  public icon!:any;

  constructor(public documentService: DocumentService) {
    document.addEventListener("dragstart", function(event) {
      // The dataTransfer.setData() method sets the data type and the value of the dragged data
      console.log("draaaagggg ppprrrreeessssss");
    })
  }


  pinch(){
    this.edit= ! this.edit;
    console.log("looooonnnngggg piiinnnccchhhh");
  }

  checkOverlapping(event:any){
      let offsetLeft = 0;
      let offsetTop = 0;

      let el = event.srcElement;

      while(el){
        offsetLeft += el.offsetLeft;
        offsetTop += el.offsetTop;
        el = el.offsetParent;
      }
      console.log(offsetLeft,offsetTop)
      return { offsetTop:offsetTop , offsetLeft:offsetLeft }
  }

  getMiniMapPosition(event:any){
    let offsetLeft = 0;
    let offsetTop = 0;

    let el = event.srcElement;

    while(el){
      offsetLeft += el.offsetLeft;
      offsetTop += el.offsetTop;
      el = el.offsetParent;
    }
    console.log(offsetLeft,offsetTop)
    return { offsetTop:offsetTop , offsetLeft:offsetLeft }
  }

  getIconPosition(event:any){
    let offsetLeft = 0;
    let offsetTop = 0;

    let el = event.srcElement;

    while(el){
      offsetLeft += el.offsetLeft;
      offsetTop += el.offsetTop;
      el = el.offsetParent;
    }
    console.log(offsetLeft,offsetTop)
    return { offsetTop:offsetTop , offsetLeft:offsetLeft }
  }

}
