import { Component,Input } from '@angular/core';
import BrainstormElementModel from "../../models/brainstorm-element.model";

@Component({
  selector: 'app-brainstorm-element',
  templateUrl: './brainstorm-element-component.component.html',
  styleUrls: ['./brainstorm-element-component.component.less']
})
export class BrainstormElementComponentComponent {

  @Input() brainstormElement! : BrainstormElementModel

  constructor(){}

}
