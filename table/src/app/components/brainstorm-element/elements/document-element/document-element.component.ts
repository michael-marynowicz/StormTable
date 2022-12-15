

import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import WebViewer, {UI, WebViewerInstance} from "@pdftron/webviewer";


@Component({
  selector: 'app-document-element',
  templateUrl: './document-element.component.html',
  styleUrls: ['./document-element.component.less']
})
export class DocumentElementComponent implements AfterViewInit {
  @ViewChild('viewer1')  viewerRef1! : ElementRef;
  @ViewChild('viewer2')  viewerRef2! : ElementRef;

  public currentpage! : number;
  public scroll! : Element;
  public viewer1! : WebViewerInstance;
  public viewer2! : WebViewerInstance;

  ngAfterViewInit(): void {

    WebViewer({
      path: '../../../../../assets/lib',
      initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf'
    }, this.viewerRef1.nativeElement).then(instance => {
      this.viewer1 = instance;
    });

    WebViewer({
      path: '../../../../../assets/lib',
      initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf',
    }, this.viewerRef2.nativeElement).then(instance => {
      this.viewer2 = instance;
    });

  }

  getPage(){
    this.currentpage = this.viewer1.Core.documentViewer.getCurrentPage();
    console.log(this.currentpage);
    this.viewer2.Core.documentViewer.setCurrentPage(this.currentpage,true);

  }


}
