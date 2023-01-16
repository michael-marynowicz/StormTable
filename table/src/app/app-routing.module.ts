import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SelectMeetingPageComponent} from "./pages/select-meeting-page/select-meeting-page.component";
import {TableRuntimeComponent} from "./pages/table-runtime/table-runtime.component";
import {IconComponent} from "./components/icon/icon.component";
import {MiniMapComponent} from "./components/icon/mini-map/mini-map.component";
import {TestPageComponent} from "./pages/test-page/test-page.component";


const routes: Routes = [
  {path: '', component: SelectMeetingPageComponent},
  {path: 'meeting/:meetingId', component: TableRuntimeComponent},
  {path: 'personalSpace', component: IconComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
