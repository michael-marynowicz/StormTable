import {AfterViewInit, Component, Directive, ElementRef, HostListener, Inject, Input, ViewChild} from '@angular/core';
import WebViewer, {Core, UI, WebViewerInstance} from "@pdftron/webviewer";
import annotationManager = Core.annotationManager;
import DocumentModel from "../../../../models/document.model";
import {MeetingService} from "../../../../services/meeting.service";


@Component({
  selector: 'app-document-element',
  templateUrl: './document-element.component.html',
  styleUrls: ['./document-element.component.less']
})
export class DocumentElementComponent implements AfterViewInit {
  @ViewChild('viewer1')  viewerRef1! : ElementRef;
  @ViewChild('viewer2')  viewerRef2! : ElementRef;
  @Input() docPath!: any;
  @Input() doc!: DocumentModel;

  public currentpage! : number;
  public scroll! : Element;
  public viewer1! : WebViewerInstance;
  public viewer2! : WebViewerInstance;
  public master1 : boolean = true;
  public master2 : boolean = false;
  public annotations_viewer1! : any;
  public annotations_viewer2! : any;
  public files: File[] = [];

  constructor(private meetingService: MeetingService) {
  }

  ngAfterViewInit(): void {

    WebViewer({
      path: '../../../../../assets/lib',
      initialDoc: this.docPath
    }, this.viewerRef1.nativeElement).then(instance => {
      this.viewer1 = instance;
      //switch master
      this.viewer1.Core.documentViewer.addEventListener('mouseMove', evt => {
        console.log("onHover: ");
        this.master(1)
      });
      //synchronise scrolling
      this.viewer1.Core.documentViewer.addEventListener('pageNumberUpdated', pageNumber => {
        if(this.master1){
          this.getPage_viewer1();
        }
      });
      //annotations
      const { annotationManager } = this.viewer1.Core;
      annotationManager.addEventListener('annotationChanged', (annotations, action) => {
        if(this.master1) {
          this.viewer2.Core.annotationManager.drawAnnotationsFromList(annotations).then(r => {
            console.log('this is a change that added annotations');
          });
          if (action === 'add') {
            this.annotations_viewer1 = annotationManager.getAnnotationsList();
            this.viewer2.Core.annotationManager.deleteAnnotations(this.viewer2.Core.annotationManager.getAnnotationsList());
            this.viewer2.Core.annotationManager.addAnnotations(this.annotations_viewer1);
            this.viewer2.Core.annotationManager.drawAnnotationsFromList(annotations).then(r => {
              console.log('this is a change that added annotations');
            });
          } else if (action === 'modify') {
            console.log('this change modified annotations');
          } else if (action === 'delete') {
            console.log('there were annotations deleted');
          }
          annotations.forEach((annot: any) => {
            console.log('annotation page number', annot.PageNumber);
          });
        }
      });

      //save document
      /*const target = this.viewer1.Core.documentViewer.getDocument().getPDFDoc().;
      this.files = [...this.files, ...Array.from(target.files as FileList)];*/

      this.viewer1.UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: 'save',
          onClick: async () => {
            console.log("button clicked");
            const doc = this.viewer1.Core.documentViewer.getDocument();
            console.log(doc);
            const data = await doc.getFileData({
              // saves the document with annotations in it

            });
            const arr = new Uint8Array(data);
            const blob = new Blob([arr], { type: 'application/pdf' });
          }
        });
      });

    });


    WebViewer({
      path: '../../../../../assets/lib',
      initialDoc: this.docPath
    }, this.viewerRef2.nativeElement).then(instance => {
      this.viewer2 = instance;
      //switch master
      this.viewer2.Core.documentViewer.addEventListener('mouseMove', evt => {
        console.log("onHover: ");
        this.master(2)
      });
      //synchronise scrolling
      this.viewer2.Core.documentViewer.addEventListener('pageNumberUpdated', pageNumber => {
        if(this.master2){
          this.getPage_viewer2();
        }
      });
      //annotations
      const { annotationManager } = this.viewer2.Core;
      annotationManager.addEventListener('annotationChanged', (annotations, action) => {
        if (this.master2) {
          this.viewer1.Core.annotationManager.drawAnnotationsFromList(annotations).then(r => {
            console.log('this is a change that added annotations');
          });
          if (action === 'add') {
            this.annotations_viewer2 = annotationManager.getAnnotationsList();
            this.viewer1.Core.annotationManager.deleteAnnotations(this.viewer1.Core.annotationManager.getAnnotationsList());
            this.viewer1.Core.annotationManager.addAnnotations(this.annotations_viewer2);
            this.viewer1.Core.annotationManager.drawAnnotationsFromList(annotations).then(r => {
              console.log('this is a change that added annotations');
            });
          } else if (action === 'modify') {
            this.annotations_viewer2 = annotationManager.getAnnotationsList();
            this.viewer1.Core.annotationManager.deleteAnnotations(this.viewer1.Core.annotationManager.getAnnotationsList());
            this.viewer1.Core.annotationManager.addAnnotations(this.annotations_viewer2);
            this.viewer1.Core.annotationManager.drawAnnotationsFromList(annotations).then(r => {
              console.log('this change modified annotations');
            });
          } else if (action === 'delete') {
            this.annotations_viewer2 = annotationManager.getAnnotationsList();
            this.viewer1.Core.annotationManager.deleteAnnotations(this.viewer1.Core.annotationManager.getAnnotationsList());
            this.viewer1.Core.annotationManager.addAnnotations(this.annotations_viewer2);
            this.viewer1.Core.annotationManager.drawAnnotationsFromList(annotations).then(r => {
              console.log('there were annotations deleted');
            });
          }
          annotations.forEach((annot: any) => {
            console.log('annotation page number', annot.PageNumber);
          });
      }
      });
    });

  }

  async upload() {
    await this.meetingService.uploadFile(this.files);
  }

  getPage_viewer1(){
    this.currentpage = this.viewer1.Core.documentViewer.getCurrentPage();
    this.viewer2.Core.documentViewer.setCurrentPage(this.currentpage,true);
  }
  getPage_viewer2(){
    this.currentpage = this.viewer2.Core.documentViewer.getCurrentPage();
    this.viewer1.Core.documentViewer.setCurrentPage(this.currentpage,true);
  }


  master(number: number) {
    if(number == 1){
      this.master1 = true;
      this.master2 = false
    }else{
      this.master1 =false;
      this.master2 = true;
    }
  }
}
