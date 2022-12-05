import {Component, Input} from '@angular/core';
import { transform } from '../../../utils/style.utils';
import SpotModel from "../../models/spot.model";
import {fromPosition} from "../../models/viewport.model";

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.less']
})
export class SpotComponent {
  @Input() spot!: SpotModel;
  get positionStyle() {
    return transform(fromPosition(this.spot.x, this.spot.y))
  }
}
