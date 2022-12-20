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

export class ContainerElementComponent implements OnInit{

  @Input() doc!: DocumentModel;
  @Input() edit: boolean = true;
  @Input() docPath!: string;
  public icon!:any;

  constructor(public documentService: DocumentService) {
    document.addEventListener("dragstart", function(event) {
      // The dataTransfer.setData() method sets the data type and the value of the dragged data
      console.log("draaaagggg ppprrrreeessssss");
    })


  }

  ngOnInit(): void {
    this.docPath = "../../../../../../../backend/" + this.doc.path.replace("\\","/");
    //this.docPath = "../../../../../assets/TIM2022-TD3.pdf";
  }


  pinch(){
    this.edit= ! this.edit;
    console.log("looooonnnngggg piiinnnccchhhh");
    this.docPath = "../../../../../../../backend/" + this.doc.path.replace("\\","/");
  }

}
