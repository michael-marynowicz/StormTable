import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SelectUserPageComponent} from "./pages/select-user-page/select-user-page.component";
import {PromptSpotIdComponent} from "./pages/prompt-spot-id/prompt-spot-id.component";

const routes: Routes = [
  {path: '', component: SelectUserPageComponent},
  {path: 'user/:userId', component: PromptSpotIdComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
