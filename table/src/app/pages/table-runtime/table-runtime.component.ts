import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TableService} from "../../services/table.service";
import SpotModel from "../../models/spot.model";

@Component({
  selector: 'app-table-runtime',
  templateUrl: './table-runtime.component.html',
  styleUrls: ['./table-runtime.component.less']
})
export class TableRuntimeComponent {

  spots: SpotModel[] = []
  constructor(aroute: ActivatedRoute, private tableService: TableService) {
    aroute.params.subscribe((_) => {
      const id = aroute.snapshot.params["meetingId"]
      tableService.createSession(id);
    });
    tableService.spotsChanged.subscribe((v) => {
      this.spots = v;
    });
  }

  doubleTap(event: MouseEvent) {
    this.tableService.createSpot({ x: event.clientX, y: event.clientY })
  }

  simpleTap(event: MouseEvent) {
    //console.log(event)
  }
}
