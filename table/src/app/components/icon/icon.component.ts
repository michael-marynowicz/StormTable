import {Component, Input, OnInit, Output} from '@angular/core';
import {IconService} from "../../services/icon.service";
import {Observable} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import DocumentModel from "../../models/document.model";
import {Session} from "../../models/session.model";
import {DocumentService} from "../../services/document.service";

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less']
})
export class IconComponent implements OnInit {

  @Input() doc!: DocumentModel;

  session!: Session

  private URL = "http://localhost:3000/"

  safeURL!: SafeResourceUrl;

  loadFile: Observable<Object> | undefined

  isOpen: boolean = false;

  isDrag: boolean = false;

  dropPoint = {x: 0, y: 0};

  @Input() docName! : string[];
  @Input() edit: boolean = true;
  @Input() docPath!: string;

  constructor(private iconService: IconService, private sanitizer: DomSanitizer,public documentService: DocumentService) {
    this.docPath = this.URL + this.documentService.files[this.documentService.files.length-1].path.replace("\\","/");
    //todo get the specific file pinched
  }

  pinch(){
    this.edit= ! this.edit;
    console.log("looooonnnngggg piiinnnccchhhh");
    this.docPath = this.URL + this.documentService.files[this.documentService.files.length-1].path.replace("\\","/");
    //todo get the specific file pinched
  }

  load() {
    this.loadFile = this.iconService.load(this.URL + this.doc.path)
    this.isOpen = true;
  }

  ngOnInit(): void {
    //this.docPath = "../../../../../../../backend/" + this.doc.path.replace("\\","/");
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.URL + this.doc.path)
    console.log("safeurl",this.safeURL);
    this.docName  = this.doc.name.split(".", 3);
  }


  drag($event: Event) {
    this.isDrag = true;
    const event = $event as unknown as { center: { x: number, y: number } };
    this.dropPoint = event.center
    this.dropPoint.x += this.dropPoint.x >= (window.innerWidth - 300) ? -150 : 150
  }

}
