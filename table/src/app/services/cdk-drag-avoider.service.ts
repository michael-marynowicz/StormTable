import {Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export default class CdkDragAvoiderService {
  onMouseUp = new Subject<MouseEvent>();

  constructor() {
    document.addEventListener('mouseup', (event) => this.onMouseUp.next(event));
  }
}
