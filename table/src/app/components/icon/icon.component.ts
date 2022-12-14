import {Component, Input, OnInit} from '@angular/core';
import {IconService} from "../../services/icon.service";
import {Observable} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import DocumentModel from "../../models/document.model";

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less']
})
export class IconComponent implements OnInit{


  @Input() doc!: DocumentModel;

  private URL = "http://localhost:3000/"

  safeURL!: SafeResourceUrl;

  loadFile : Observable<Object> | undefined

  isOpen: boolean = false;

  constructor(private iconcservice: IconService,private sanitizer: DomSanitizer) {
  }


  load(){
    this.loadFile =this.iconcservice.load(this.URL+this.doc.path)
    this.isOpen=true;
  }

  ngOnInit(): void {
    this.safeURL= this.sanitizer.bypassSecurityTrustResourceUrl(this.URL+this.doc.path)
  }



}
