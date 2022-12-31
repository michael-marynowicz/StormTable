import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";


export interface AlertContent {
  type: "LOG" | "ERROR" | "WARN"
  header: string
  content?: string
}

export class ErrorAlert implements AlertContent {
  type: "LOG" | "ERROR" | "WARN" = "ERROR";

  constructor(public header: string, public content: string | undefined) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  onAlert = new BehaviorSubject<null>(null);
  alertQueue: AlertContent[] = []

  constructor() {
  }

  dequeue() {
    return this.alertQueue.pop()
  }

  showDialog(alertContent: AlertContent) {
    this.alertQueue.push(alertContent)
    this.onAlert.next(null);
  }
}
