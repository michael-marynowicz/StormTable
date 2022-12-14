import {AfterViewInit, Component, Directive, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import WebViewer from "@pdftron/webviewer";


@Component({
  selector: 'app-document-element',
  templateUrl: './document-element.component.html',
  styleUrls: ['./document-element.component.less']
})
export class DocumentElementComponent implements AfterViewInit{
  title = 'viewer-app';
  currentElement!: string;
  @ViewChild('viewer1')  viewerRef1!: ElementRef;
  @ViewChild('viewer2')  viewerRef2!: ElementRef;

  ngAfterViewInit(): void {
    WebViewer({
      path: '../../../../../assets/lib',
      initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf'
    }, this.viewerRef1.nativeElement).then(instance => {
    });

    WebViewer({
      path: '../../../../../assets/lib',
      initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf'
    }, this.viewerRef2.nativeElement).then(instance => {
    });

  }

    updateVerticalScroll(event: any): void {
      console.log(' scrolling');
      if (this.currentElement === 'viewer2') {
      this.viewerRef1.nativeElement.scrollTop = event.target.scrollTop;
      } else if (this.currentElement === 'viewer1') {
        this.viewerRef2.nativeElement.scrollTop = event.target.scrollTop;
      }
    }

    updateCurrentElement(element: 'viewer1' | 'viewer2') {
      this.currentElement = element;
    }
}
