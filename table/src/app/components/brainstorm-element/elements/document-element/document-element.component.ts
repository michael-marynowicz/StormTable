import {AfterViewInit, Component, Directive, ElementRef, HostListener, Inject, Input, ViewChild} from '@angular/core';
import WebViewer, {UI, WebViewerInstance} from "@pdftron/webviewer";


@Component({
  selector: 'app-document-element',
  templateUrl: './document-element.component.html',
  styleUrls: ['./document-element.component.less']
})
export class DocumentElementComponent implements AfterViewInit {
  @ViewChild('viewer1')  viewerRef1! : ElementRef;
  @ViewChild('viewer2')  viewerRef2! : ElementRef;
  @Input() docPath!: any;

  public currentpage! : number;
  public scroll! : Element;
  public viewer1! : WebViewerInstance;
  public viewer2! : WebViewerInstance;
  public master1 : boolean = true;
  public master2 : boolean = false;

  ngAfterViewInit(): void {

    WebViewer({
      path: '../../../../../assets/lib',
      initialDoc: this.docPath
    }, this.viewerRef1.nativeElement).then(instance => {
      this.viewer1 = instance;
      instance.Core.documentViewer.addEventListener('pageNumberUpdated', pageNumber => {
        if(this.master1){
          this.getPage_viewer1();
        }
      });
    });

    WebViewer({
      path: '../../../../../assets/lib',
      initialDoc: this.docPath
    }, this.viewerRef2.nativeElement).then(instance => {
      this.viewer2 = instance;
      instance.Core.documentViewer.addEventListener('pageNumberUpdated', pageNumber => {
        if(this.master2){
          this.getPage_viewer2();
        }
      });
    });

  }

  getPage_viewer1(){
    this.currentpage = this.viewer1.Core.documentViewer.getCurrentPage();
    console.log(this.currentpage);
    this.viewer2.Core.documentViewer.setCurrentPage(this.currentpage,true);
  }
  getPage_viewer2(){
    this.currentpage = this.viewer2.Core.documentViewer.getCurrentPage();
    console.log(this.currentpage);
    this.viewer1.Core.documentViewer.setCurrentPage(this.currentpage,true);
  }


}
