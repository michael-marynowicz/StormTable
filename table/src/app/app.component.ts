import {Component, OnInit} from '@angular/core';
import DocumentModel from "./models/document.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'table';

  constructor() {
  }

  ngOnInit(): void {
  }

}
