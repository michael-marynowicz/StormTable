import {AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import WebViewer, {WebViewerInstance} from "@pdftron/webviewer";


@Component({
  selector: 'app-document-element',
  templateUrl: './document-element.component.html',
  styleUrls: ['./document-element.component.less']
})
export class DocumentElementComponent implements AfterViewInit {
  @ViewChild('viewer1') viewerRef1!: ElementRef;
  @ViewChild('viewer2') viewerRef2!: ElementRef;

  @Input()
  docPath!: any;

  public currentpage!: number;
  public scroll!: Element;
  public viewer1!: WebViewerInstance;
  public viewer2!: WebViewerInstance;

  ngAfterViewInit(): void {
    WebViewer({
      path: '../../../../../assets/lib',
      initialDoc: this.docPath
    }, this.viewerRef1.nativeElement).then(instance => {
      this.viewer1 = instance;
    });

    WebViewer({
      path: '../../../../../assets/lib',
      initialDoc: this.docPath
    }, this.viewerRef2.nativeElement).then(instance => {
      this.viewer2 = instance;
    });

    const documentViewer = this.viewer1.Core.documentViewer;
    const scrollViewElement = documentViewer.getScrollViewElement();
    scrollViewElement.scroll({
      left: 0, // Can set to null since we only care about vertical scrolling.
      top: 3000,
      behavior: 'smooth'
    });

  }


  getPage2() {
    console.log("##################################",this.viewer2.Core.documentViewer.getCurrentPage())
    this.currentpage = this.viewer2.Core.documentViewer.getCurrentPage();
    this.viewer1.Core.documentViewer.setCurrentPage(this.currentpage, true);
    //this.viewer2.Core.documentViewer.scrollViewUpdated();
  }


  getPage1() {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.viewer1.Core.documentViewer.getCurrentPage())
    this.currentpage = this.viewer1.Core.documentViewer.getCurrentPage();
    this.viewer2.Core.documentViewer.setCurrentPage(this.currentpage, true);
    //this.viewer1.Core.documentViewer.scrollViewUpdated();
  }

  @HostListener('window:scroll', ['$event'])
  doSomething(event:MouseEvent) {
    console.log("Scroll Event", window.pageYOffset );

  }


  test() {
    console.log("okokokokkkokokko")
  }
}
