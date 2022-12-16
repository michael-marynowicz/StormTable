import {Component, Input, OnInit} from '@angular/core';
import "hammerjs"


@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.less']
})
export class MiniMapComponent implements OnInit {

  @Input()
  isDrag!: boolean;

  ngOnInit(): void {
  }


}
