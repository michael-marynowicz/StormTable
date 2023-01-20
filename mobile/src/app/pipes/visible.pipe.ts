import { Pipe, PipeTransform } from '@angular/core';
import {DocumentModel} from "../models/document.model";
import {UserSessionService} from "../services/user-session.service";

@Pipe({
  name: 'visible'
})
export class VisiblePipe implements PipeTransform {

  constructor(private userSessionService: UserSessionService){}
  transform(value: DocumentModel[], ...args: unknown[]): DocumentModel[] {
    return value.filter((doc) => !doc.user || doc.user === this.userSessionService.currentUser?.id)
  }

}
