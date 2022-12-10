import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SelectMeetingPageComponent} from "./pages/select-meeting-page/select-meeting-page.component";
import {TestPageComponent} from "./pages/test-page/test-page.component";
import {TableRuntimeComponent} from "./pages/table-runtime/table-runtime.component";
import {PersonalSpaceComponent} from "./components/tool-bar/personal-space/personal-space.component";
import {DocumentElementComponent} from "./components/brainstorm-element/elements/document-element/document-element.component";
import {ToolBarComponent} from "./components/tool-bar/tool-bar.component";

const routes: Routes = [
  { path: '', component: SelectMeetingPageComponent },
  { path: 'test', component: TestPageComponent },
  { path: 'meeting/:meetingId', component: TableRuntimeComponent },
  {path: 'personalSpace', component:DocumentElementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
