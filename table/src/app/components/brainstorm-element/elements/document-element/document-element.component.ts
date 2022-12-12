import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import WebViewer from "@pdftron/webviewer";

@Component({
  selector: 'app-document-element',
  templateUrl: './document-element.component.html',
  styleUrls: ['./document-element.component.less']
})
export class DocumentElementComponent implements AfterViewInit{
  title = 'viewer-app';
  @ViewChild('viewer')  viewerRef!: ElementRef;

  ngAfterViewInit(): void {

    WebViewer({
      path:'../../../../../assets/lib',
      initialDoc:'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf'
    },this.viewerRef.nativeElement).then(instance =>{

    });



    /*const viewer = new GcPdfViewer("#viewer", {
      workerSrc: "C:/Users/AZEBAZE Nadine/Downloads/GcPdf-5.2.0.805/GcPdfViewerWeb/SupportApiDemo/wwwroot/lib/gc-pdfviewer/build/gcpdfviewer.worker.js",
      supportApi: {
        apiUrl: "http://localhost:5004/api/pdf-viewer",
        token: "support-api-demo-net-core-token-2021",
        webSocketUrl: false
      }
    }
    viewer.addDefaultPanels();
    viewer.addAnnotationEditorPanel();
    viewer.addFormEditorPanel();
    const toolbarLayout = viewer.toolbarLayout;
    toolbarLayout.viewer.mobile = toolbarLayout.viewer.default = ["text-tools", "draw-tools", "attachment-tools",
      "form-tools", "page-tools", "$split", "save", "$navigation", "$zoom"];
    const secondToolbarLayout = viewer.secondToolbarLayout;
    secondToolbarLayout["draw-tools"] = ['edit-text', 'edit-ink', '$split', 'edit-square',
      'edit-circle', 'edit-line', '$split', 'edit-undo', 'edit-redo', '$split', 'edit-redact', 'edit-redact-apply'];
    viewer.open("assets/TIM2022-TD3.pdf");*/
  }
}
