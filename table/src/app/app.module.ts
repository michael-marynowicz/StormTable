import { NgModule } from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectMeetingPageComponent } from './pages/select-meeting-page/select-meeting-page.component';
import { FloatingWindowsComponent } from './components/floating-windows/floating-windows.component';
import { AlertComponent } from './components/alert/alert.component';
import { ErrorAlertComponent } from './components/alert/alerts/error-alert/error-alert.component';
import { AlertDrawerComponent } from './components/alert-drawer/alert-drawer.component';
import { LoadingAlertComponent } from './components/loading-alert/loading-alert.component';
import { ListSelectionDialogComponent } from './components/list-selection-dialog/list-selection-dialog.component';
import {HttpClientModule} from "@angular/common/http";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import { TableRuntimeComponent } from './pages/table-runtime/table-runtime.component';
import { SpotComponent } from './components/spot/spot.component';
import { TestPageComponent } from './pages/test-page/test-page.component';

const socketConfig: SocketIoConfig = { url: 'ws://localhost:3000', options: {}}

@NgModule({
  declarations: [
    AppComponent,
    SelectMeetingPageComponent,
    FloatingWindowsComponent,
    AlertComponent,
    ErrorAlertComponent,
    AlertDrawerComponent,
    LoadingAlertComponent,
    ListSelectionDialogComponent,
    TableRuntimeComponent,
    SpotComponent,
    TestPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(socketConfig),
    HammerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
