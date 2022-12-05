import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HomeServices {
  SERVER_URL = 'http://localhost/3000';
  constructor(private httpClient: HttpClient) {
  }

  // ---
  // PUBLIC METHODS.
  // ---

  // I upload the given file to the remote server. Returns a Promise.
  public async uploadFile( file: File ) : Promise<any> {

    var result = await this.httpClient
      .post<any>(
        "./api/upload.cfm",
        file, // Send the File Blob as the POST body.
        {
          // NOTE: Because we are posting a Blob (File is a specialized Blob
          // object) as the POST body, we have to include the Content-Type
          // header. If we don't, the server will try to parse the body as
          // plain text.
          headers: {
            "Content-Type": file.type
          },
          params: {
            clientFilename: file.name,
            mimeType: file.type
          }
        }
      )
      .toPromise()
    ;
    return
  }

}
