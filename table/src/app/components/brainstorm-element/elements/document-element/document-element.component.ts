import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import WebViewer, {WebViewerInstance} from "@pdftron/webviewer";
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

  saveSuccess: boolean = false;

  public currentpage! : number;
  public scroll! : Element;
  public viewer1! : WebViewerInstance;
  public viewer2! : WebViewerInstance;
  public master1 : boolean = true;
  public master2 : boolean = false;
  public annotations_viewer1! : any;
  public annotations_viewer2! : any;
  public files: File[] = [];

  get width() {
    return (window.innerWidth / 2) + "px";
  }

  constructor(private meetingService: MeetingService) {
  }

  ngAfterViewInit(): void {

    WebViewer({
      path: '../../../../../assets/lib',
      initialDoc: this.docPath
    }, this.viewerRef1.nativeElement).then(instance => {
      this.viewer1 = instance;
      //switch master
      this.viewer1.Core.documentViewer.addEventListener('mouseMove', _ => {
        console.log("onHover: ");
        this.master(1)
      });
      //synchronise scrolling
      this.viewer1.Core.documentViewer.addEventListener('pageNumberUpdated', _ => {
        if(this.master1){
          this.getPage_viewer1();
        }
      });
      //annotations
      const { annotationManager } = this.viewer1.Core;
      annotationManager.addEventListener('annotationChanged', (annotations, action) => {
        if(this.master1) {
          this.viewer2.Core.annotationManager.drawAnnotationsFromList(this.viewer2.Core.annotationManager.getAnnotationsList()).then(_ => {
            console.log('this is a change that added annotations');
          });
          if (action === 'add') {
            this.annotations_viewer1 = annotationManager.getAnnotationsList();
            this.viewer2.Core.annotationManager.deleteAnnotations(this.viewer2.Core.annotationManager.getAnnotationsList());
            this.viewer2.Core.annotationManager.addAnnotations(this.annotations_viewer1);
            this.viewer2.Core.annotationManager.drawAnnotationsFromList(annotations).then(_ => {
              console.log('this is a change that added annotations');
            });
          } else if (action === 'modify') {
            this.annotations_viewer1 = annotationManager.getAnnotationsList();
            this.viewer2.Core.annotationManager.deleteAnnotations(this.viewer2.Core.annotationManager.getAnnotationsList());
            this.viewer2.Core.annotationManager.addAnnotations(this.annotations_viewer1);
            this.viewer2.Core.annotationManager.drawAnnotationsFromList(annotations).then(_ => {
              console.log('this change modified annotations');
            });
          } else if (action === 'delete') {
            this.annotations_viewer1 = annotationManager.getAnnotationsList();
            this.viewer2.Core.annotationManager.deleteAnnotations(this.viewer2.Core.annotationManager.getAnnotationsList());
            this.viewer2.Core.annotationManager.addAnnotations(this.annotations_viewer1);
            this.viewer2.Core.annotationManager.drawAnnotationsFromList(annotations).then(_ => {
              console.log('there were annotations deleted');
            });
          } else{
            this.annotations_viewer1 = annotationManager.getAnnotationsList();
            this.viewer2.Core.annotationManager.deleteAnnotations(this.viewer2.Core.annotationManager.getAnnotationsList());
            this.viewer2.Core.annotationManager.addAnnotations(this.annotations_viewer1);
            this.viewer2.Core.annotationManager.drawAnnotationsFromList(annotations).then(_ => {
              console.log('there were annotations');
            });
          }
          annotations.forEach((annot: any) => {
            console.log('annotation page number', annot.PageNumber);
          });
        }
      });

      //save document
      this.viewer1.UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
          onClick: async () => {
            this.saveAlert();
            const doc = this.viewer1.Core.documentViewer.getDocument();
            const xfdfString = await annotationManager.exportAnnotations();
            console.log(doc);
            const data = await doc.getFileData({
              // saves the document with annotations in it
              xfdfString
            });
            const arr = new Uint8Array(data);
            const blob = new Blob([arr], { type: 'application/pdf' });
            console.log("blob",blob);
            const myFile = this.blobToFile(blob, "annoted_"+doc.getFilename());
            console.log("file", myFile);
            this.files.push(myFile);
            await this.meetingService.uploadFile(this.files);

            if(confirm("Are you sure to delete ")) {
              console.log("Implement delete functionality here");
            }
          },
          dataElement: 'alertButton'
        });
      });

    });


    WebViewer({
      path: '../../../../../assets/lib',
      initialDoc: this.docPath
    }, this.viewerRef2.nativeElement).then(instance => {
      this.viewer2 = instance;
      //switch master
      this.viewer2.Core.documentViewer.addEventListener('mouseMove', _ => {
        console.log("onHover: ");
        this.master(2)
      });
      //synchronise scrolling
      this.viewer2.Core.documentViewer.addEventListener('pageNumberUpdated', _ => {
        if(this.master2){
          this.getPage_viewer2();
        }
      });
      //annotations
      const { annotationManager } = this.viewer2.Core;
      annotationManager.addEventListener('annotationChanged', (annotations, action) => {
        if (this.master2) {
          this.viewer1.Core.annotationManager.drawAnnotationsFromList(this.viewer1.Core.annotationManager.getAnnotationsList()).then(_ => {
            console.log('this is a change that added annotations');
          });
          if (action === 'add') {
            this.annotations_viewer2 = annotationManager.getAnnotationsList();
            this.viewer1.Core.annotationManager.deleteAnnotations(this.viewer1.Core.annotationManager.getAnnotationsList());
            this.viewer1.Core.annotationManager.addAnnotations(this.annotations_viewer2);
            this.viewer1.Core.annotationManager.drawAnnotationsFromList(annotations).then(_ => {
              console.log('this is a change that added annotations');
            });
          } else if (action === 'modify') {
            this.annotations_viewer2 = annotationManager.getAnnotationsList();
            this.viewer1.Core.annotationManager.deleteAnnotations(this.viewer1.Core.annotationManager.getAnnotationsList());
            this.viewer1.Core.annotationManager.addAnnotations(this.annotations_viewer2);
            this.viewer1.Core.annotationManager.drawAnnotationsFromList(annotations).then(_ => {
              console.log('this change modified annotations');
            });
          } else if (action === 'delete') {
            this.annotations_viewer2 = annotationManager.getAnnotationsList();
            this.viewer1.Core.annotationManager.deleteAnnotations(this.viewer1.Core.annotationManager.getAnnotationsList());
            this.viewer1.Core.annotationManager.addAnnotations(this.annotations_viewer2);
            this.viewer1.Core.annotationManager.drawAnnotationsFromList(annotations).then(_ => {
              console.log('there were annotations deleted');
            });
          }
          annotations.forEach((annot: any) => {
            console.log('annotation page number', annot.PageNumber);
          });
      }
      });

      //save document
      this.viewer2.UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
          onClick: async () => {
            this.saveAlert();
            const doc = this.viewer2.Core.documentViewer.getDocument();
            const xfdfString = await annotationManager.exportAnnotations();
            console.log(doc);
            const data = await doc.getFileData({
              // saves the document with annotations in it
              xfdfString
            });
            const arr = new Uint8Array(data);
            const blob = new Blob([arr], { type: 'application/pdf' });
            console.log("blob",blob);
            const myFile = this.blobToFile(blob, "annoted_"+doc.getFilename());
            console.log("file", myFile);
            this.files.push(myFile);
            await this.meetingService.uploadFile(this.files);
          }
        });
      });

    });

  }

  saveAlert() {
    this.saveSuccess=true;
    setTimeout(()=>{
      this.saveSuccess=false;},50)
  }


  getPage_viewer1(){
    this.currentpage = this.viewer1.Core.documentViewer.getCurrentPage();
    this.viewer2.Core.documentViewer.setCurrentPage(this.currentpage,true);
  }
  getPage_viewer2(){
    this.currentpage = this.viewer2.Core.documentViewer.getCurrentPage();
    this.viewer1.Core.documentViewer.setCurrentPage(this.currentpage,true);
  }

  public blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;
    //Cast to a File() type
    return <File>theBlob;
  }


  master(number: number) {
    //master 1 = viewer 1
    //master 2 = viewer 2
    if(number == 1){
      this.master1 = true;
      this.master2 = false
    }else{
      this.master1 =false;
      this.master2 = true;
    }
  }
}
