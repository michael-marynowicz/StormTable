import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {AlertService, ErrorAlert} from "./alert.service";
import SpotModel from "../models/spot.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  tableId = "00bb39f2-eb16-45cf-ad7e-1c7c37b1ed2f"
  tableSecret = "00bb39f2-eb16-45cf-ad7e-1c7c37b1ed2f"

  spots: SpotModel[] = []
  spotsChanged = new BehaviorSubject<SpotModel[]>([]);


  constructor(private socket: Socket, private alertService: AlertService) { }

  createSession(meetingId: string) {
    this.socket.on('error', (data: { type: string, message: string }) => {
      this.alertService.showDialog(new ErrorAlert(data.type, data.message))
    })
    this.socket.on("meeting", (data: any) => {
      console.log("connected !")
      console.log(data)
    })
    this.socket.emit("createSession", {
      clientId: this.tableId,
      clientSecret: this.tableSecret,
      meetingId: meetingId
    })
  }

  net_addSpot(data: SpotModel) {
    this.spots.push(data)
    this.spotsChanged.next(this.spots)
  }

  createSpot(position: { x: number, y: number }) {
    this.socket.on("addSpot", (data: { spotId: string, x: number, y: number }) =>
      this.net_addSpot(Object.assign(data, { id: data.spotId })));
    this.socket.emit("createSpot", { tableId: this.tableId, x: position.x, y: position.y })
  }
}
