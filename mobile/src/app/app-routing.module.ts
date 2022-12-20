import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PromptSpotIdComponent} from "./pages/prompt-spot-id/prompt-spot-id.component";
import {SpotPageComponent} from "./pages/spot-page/spot-page.component";
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {SuccessPageComponent} from "./pages/success-page/success-page.component";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'user/:userId', component: PromptSpotIdComponent},
  {path: 'spot/:spotId', component: SpotPageComponent},
  {path:'success', component: SuccessPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
