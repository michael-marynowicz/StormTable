import {Component, Input} from '@angular/core';
import { transform } from '../../../utils/style.utils';
import {fromPosition} from "../../models/viewport.model";
import {SpotModel} from "../../models/spot.mode";

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.less']
})
export class SpotComponent {
  @Input() spot!: SpotModel;
  get positionStyle() {
    return transform(fromPosition(this.spot.location.x, this.spot.location.y))
  }
}
