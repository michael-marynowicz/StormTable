import {Component, Input} from '@angular/core';
import BrainstormElementModel from "../../../../models/brainstorm-element.model";

@Component({
  selector: 'app-picture-element',
  templateUrl: './picture-element.component.html',
  styleUrls: ['./picture-element.component.less']
})
export class PictureElementComponent {

  @Input() brainstorElementModel!: BrainstormElementModel
}
