import {Component, Input, OnInit} from '@angular/core';
import {IconService} from "../../services/icon.service";
import {Observable} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {BrainstormElementType} from "../../models/brainstorm-element.model";

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less']
})
export class IconComponent implements OnInit{

  @Input() src! : string;
  @Input() name! : string;

  @Input() type! : string;
  safeURL!: SafeResourceUrl;

  loadFile : Observable<Object> | undefined

  isOpen: boolean = false;

  constructor(private iconcservice: IconService,private sanitizer: DomSanitizer) {
  }


  load(){
    this.loadFile =this.iconcservice.load(this.src)
    this.isOpen=true;
  }

  ngOnInit(): void {
    this.safeURL= this.sanitizer.bypassSecurityTrustResourceUrl(this.src)
  }
  get defineType(){
    switch (this.type){
      case BrainstormElementType.PICTURE: return 'picture';
      case BrainstormElementType.PDF: return 'pdf';
      case BrainstormElementType.TXT: return 'txt';
      case BrainstormElementType.PPTX: return 'pptx';
      default: return this.type;
    }
  }


}
