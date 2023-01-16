import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectUserPageComponent } from './pages/select-user-page/select-user-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { PromptSpotIdComponent } from './pages/prompt-spot-id/prompt-spot-id.component';
import {FormsModule} from "@angular/forms";
import { SelectUserComponent } from './components/select-user/select-user.component';
import { SpotPageComponent } from './pages/spot-page/spot-page.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SuccessPageComponent } from './pages/success-page/success-page.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { UploadFileComponent } from './pages/upload-file/upload-file.component';
import { FileViewComponent } from './components/file-view/file-view.component';
import {UserInterceptor} from "./services/user.interceptor";
import {DomainInterceptor} from "./services/domain.interceptor";
import { MeetingsPageComponent } from './pages/meetings-page/meetings-page.component';
import { MeetingPageComponent } from './pages/meeting-page/meeting-page.component';
import { NoDirectoryPipe } from './pipes/no-directory.pipe';

const socketConfig: SocketIoConfig = { url: 'ws://localhost:3000/client', options: {
}}

@NgModule({
  declarations: [
    AppComponent,
    SelectUserPageComponent,
    PromptSpotIdComponent,
    SelectUserComponent,
    SpotPageComponent,
    WelcomeComponent,
    SuccessPageComponent,
    HomePageComponent,
    PageLayoutComponent,
    LoginComponent,
    UploadFileComponent,
    FileViewComponent,
    MeetingsPageComponent,
    MeetingPageComponent,
    NoDirectoryPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(socketConfig)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DomainInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
