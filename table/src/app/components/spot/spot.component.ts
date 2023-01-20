import {Component, Input, OnInit} from '@angular/core';
import {transform} from '../../../utils/style.utils';
import {fromPosition} from "../../models/viewport.model";
import {SpotModel} from "../../models/spot.mode";
import {mobileDomain} from "../../../../domain.config";

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.less']
})
export class SpotComponent implements OnInit {
  @Input() spot!: SpotModel;

  get positionStyle() {
    return transform(fromPosition(this.spot.location.x, this.spot.location.y))
  }

  get qrcodeValue() {
    return mobileDomain + "/spot/" + this.spot.id;
  }

  ngOnInit(): void {
    console.log(this.spot)
  }
}
