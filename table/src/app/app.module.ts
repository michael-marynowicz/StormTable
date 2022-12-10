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
import {BrainstormElementComponentComponent} from "./components/brainstorm-element/brainstorm-element-component.component";
import { PictureElementComponent } from './components/brainstorm-element/elements/picture-element/picture-element.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { DrawButtonComponent } from './components/tool-bar/draw-button/draw-button.component';
import { ButtonTextComponent } from './components/tool-bar/button-text/button-text.component';
import {PersonalSpaceComponent} from "./components/tool-bar/personal-space/personal-space.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {DocumentElementComponent} from "./components/brainstorm-element/elements/document-element/document-element.component";

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
    TestPageComponent,
    BrainstormElementComponentComponent,
    PictureElementComponent,
    ToolBarComponent,
    DrawButtonComponent,
    ButtonTextComponent,
    PersonalSpaceComponent,
    DocumentElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(socketConfig),
    HammerModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
