import WebViewer from '@pdftron/webviewer'
import { CollabClient } from '@pdftron/collab-client'
import {AfterViewInit, Component, ElementRef, Input, ViewChild} from "@angular/core";

@Component({
  selector: 'app-document-element',
  templateUrl: './document-element.component.html',
  styleUrls: ['./document-element.component.less']
})


export class DocumentElementComponent implements AfterViewInit{
  @ViewChild('viewer1') viewerRef1!: ElementRef;
  @Input()
  docPath!: any;

  ngAfterViewInit(): void {
    WebViewer(
      {
        path: '../../../../../assets/lib',
        //initialDoc:'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf'
      },
      this.viewerRef1.nativeElement
    ).then(async instance => {

      const client = new CollabClient({
        instance,
        logLevel: CollabClient.LogLevels.DEBUG,
        filterLogsByTag: CollabClient.LogTags.AUTH,
        url: `http://localhost:3001`,
        subscriptionUrl: `ws://localhost:3001/subscribe`
      })

      const user = client.loginAnonymously('PDFTron');
      console.log("user", user);
      const filePath = 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf';

      /*const createDocument = async () => {
        const document = await user.createDocument({
          document: filePath,
          isPublic: true,
          name: 'document.pdf'
        });
        await document.view(filePath);
      }

      let button =  document.getElementById('my-button')!;
      button.onclick = createDocument;*/

     /* const documents = await user.getAllDocuments();
      if(documents.length > 0) {
        const mostRecentDocument = documents[0];
        await mostRecentDocument.view(filePath);
      }*/
    });
  }
}
