import {Injectable} from "@angular/core";
import {Socket} from "ngx-socket-io";
import SessionModel from "../models/session.model";
import {AlertService, ErrorAlert} from "./alert.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  private session?: SessionModel;
  public session$ = new BehaviorSubject<SessionModel|undefined>(undefined)

  constructor(private socket: Socket, alertService: AlertService) {
    this.socket.on('error', (data: { type: string, message: string}) => {
      alertService.showDialog(new ErrorAlert(data.type, data.message))
    })
  }

  createSession(meetingId: string) {
    this.socket.on('session_created', (data: { session: SessionModel }) => {
      this.session = data.session
    });
  }
}
