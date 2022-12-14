import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "../home/home.component";
import {DropZoneComponent} from "./drop-zone/drop-zone.component";
import {NgxFileDropModule} from "ngx-file-drop";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DropZoneComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxFileDropModule,
    NgxFileDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
