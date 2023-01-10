import {NgModule} from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SelectMeetingPageComponent} from './pages/select-meeting-page/select-meeting-page.component';
import {FloatingWindowsComponent} from './components/floating-windows/floating-windows.component';
import {AlertComponent} from './components/alert/alert.component';
import {ErrorAlertComponent} from './components/alert/alerts/error-alert/error-alert.component';
import {AlertDrawerComponent} from './components/alert-drawer/alert-drawer.component';
import {LoadingAlertComponent} from './components/loading-alert/loading-alert.component';
import {ListSelectionDialogComponent} from './components/list-selection-dialog/list-selection-dialog.component';
import {HttpClientModule} from "@angular/common/http";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {TableRuntimeComponent} from './pages/table-runtime/table-runtime.component';
import {SpotComponent} from './components/spot/spot.component';
import {
  BrainstormElementComponentComponent
} from "./components/brainstorm-element/brainstorm-element-component.component";
import {
  PictureElementComponent
} from './components/brainstorm-element/elements/picture-element/picture-element.component';
import {IconComponent} from './components/icon/icon.component';
import {CdkDrag, DragDropModule} from "@angular/cdk/drag-drop";
import {FormsModule} from "@angular/forms";
import {
  DocumentElementComponent
} from "./components/brainstorm-element/elements/document-element/document-element.component";
import {MiniMapComponent} from "./components/icon/mini-map/mini-map.component";
import {NgxFileDropModule} from "ngx-file-drop";
import {UserStandComponent} from './components/user-stand/user-stand.component';
import {QRCodeModule} from "angularx-qrcode";
import {DirectoryComponent} from "./components/icon/directory/directory.component";

const socketConfig: SocketIoConfig = {url: 'ws://localhost:3000', options: {}}

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
    BrainstormElementComponentComponent,
    PictureElementComponent,
    DocumentElementComponent,
    IconComponent,
    MiniMapComponent,
    UserStandComponent,
    DirectoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(socketConfig),
    HammerModule,
    CdkDrag,
    DragDropModule,
    FormsModule,
    NgxFileDropModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
