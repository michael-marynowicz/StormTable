import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SelectMeetingPageComponent} from "./pages/select-meeting-page/select-meeting-page.component";
import {TestPageComponent} from "./pages/test-page/test-page.component";
import {TableRuntimeComponent} from "./pages/table-runtime/table-runtime.component";
import {MiniMapComponent} from "./components/icon/mini-map/mini-map.component";
import {ContainerElementComponent} from "./components/brainstorm-element/elements/container-element/container-element.component";

const routes: Routes = [
  { path: '', component: SelectMeetingPageComponent },
  { path: 'test', component: TestPageComponent },
  { path: 'meeting/:meetingId', component: TableRuntimeComponent },
  {path: 'personalSpace', component:ContainerElementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
