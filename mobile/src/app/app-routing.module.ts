import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PromptSpotIdComponent} from "./pages/prompt-spot-id/prompt-spot-id.component";
import {SpotPageComponent} from "./pages/spot-page/spot-page.component";
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {SuccessPageComponent} from "./pages/success-page/success-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {LoggedGuard} from "./guards/logged.guard";
import {LoginComponent} from "./pages/login/login.component";
import {UploadFileComponent} from "./pages/upload-file/upload-file.component";

const routes: Routes = [
  {path: '',              component: WelcomeComponent},
  {path: 'user/:userId',  component: PromptSpotIdComponent},
  {path: 'login',         component: LoginComponent},
  {path: 'spot/:spotId',  component: SpotPageComponent, canActivate: [LoggedGuard]},
  {path: 'home',          component: HomePageComponent},
  {path: 'files',         component: UploadFileComponent},
  {path: 'success',       component: SuccessPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
