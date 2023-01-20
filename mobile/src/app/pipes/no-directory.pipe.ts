import { Pipe, PipeTransform } from '@angular/core';
import {DocumentModel} from "../models/document.model";

@Pipe({
  name: 'noDirectory'
})
export class NoDirectoryPipe implements PipeTransform {

  transform(value: DocumentModel[], ...args: unknown[]): DocumentModel[] {
    return value.filter(d => d.type !== "DIRECTORY");
  }

}
