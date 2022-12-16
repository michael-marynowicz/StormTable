import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectUserPageComponent } from './pages/select-user-page/select-user-page.component';
import {HttpClientModule} from "@angular/common/http";
import { PromptSpotIdComponent } from './pages/prompt-spot-id/prompt-spot-id.component';
import {FormsModule} from "@angular/forms";
import { AuthenticatedPageComponent } from './pages/authenticated-page/authenticated-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectUserPageComponent,
    PromptSpotIdComponent,
    AuthenticatedPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
