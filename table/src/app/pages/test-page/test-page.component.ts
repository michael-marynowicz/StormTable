import { Component } from '@angular/core';
import SpotModel from "../../models/spot.model";

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.less']
})
export class TestPageComponent {
  spot: SpotModel = {
    id: "test",
    x: 300,
    y: 400
  }
}
