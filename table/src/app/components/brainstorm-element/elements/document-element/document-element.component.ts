

import {AfterViewInit, Component, Directive, ElementRef, HostListener, Inject, Input, ViewChild} from '@angular/core';
import WebViewer, {UI, WebViewerInstance} from "@pdftron/webviewer";
import {DOCUMENT} from "@angular/common";
import {Renderer} from "@grapecity/gcpdfviewer/typings/vendor/react/react-dom";
import {HttpContext} from "@angular/common/http";
import addEventListener = UI.addEventListener;


@Component({
  selector: 'app-document-element',
  templateUrl: './document-element.component.html',
  styleUrls: ['./document-element.component.less']
})
export class DocumentElementComponent implements AfterViewInit {
  @ViewChild('viewer1')  viewerRef1!: ElementRef;
  @ViewChild('viewer2')  viewerRef2!: ElementRef;

  public scroll! : Element;
  public viewer1!:WebViewerInstance;
  public viewer2!:WebViewerInstance;

  ngAfterViewInit(): void {

    WebViewer({
      path: '../../../../../assets/lib',
      initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf'
    }, this.viewerRef1.nativeElement).then(instance => {

      this.viewer1 = instance;
      this.scroll = instance.Core.documentViewer.getScrollViewElement();
      console.log(this.scroll);
    });

    WebViewer({
      path: '../../../../../assets/lib',
      initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf',
     // licenseKey: 'demo:1671005628767:7a96dd010300000000c2d90e683f649de4cab3ff554dae5e87a2cf16c2'
    }, this.viewerRef2.nativeElement).then(instance => {
      this.viewer2 = instance;
      instance.Core.documentViewer.setScrollViewElement(this.scroll);
    });

  }

  getPage(){

    this.viewer1.Core.documentViewer.setCurrentPage(3,true);
    this.viewer2.Core.documentViewer.setCurrentPage(3,true);

  }


}
