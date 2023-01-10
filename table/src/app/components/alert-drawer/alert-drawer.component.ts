import {Component, OnInit} from '@angular/core';
import {AlertContent, AlertService} from "../../services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert-drawer',
  templateUrl: './alert-drawer.component.html',
  styleUrls: ['./alert-drawer.component.less']
})
export class AlertDrawerComponent implements OnInit {

  alert?: AlertContent
  subs?: Subscription;

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.subs = this.alertService.onAlert.subscribe((_) => {
      if (this.alert) return;
      this.alert = this.alertService.dequeue();
    });
  }

  close() {
    this.alert = this.alertService.dequeue();
  }

}
