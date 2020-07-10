import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { ListComponent } from '../list/list.component';
import { DetailComponent } from '../detail/detail.component';
import { SettingComponent } from '../setting/setting.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import { UploadComponent } from '../upload/upload.component';
import { SearchComponent } from '../search/search.component';
import { QuoteCenterComponent } from '../quote-center/quote-center.component';
import { OrderCenterComponent } from '../order-center/order-center.component';
import { ReturnCenterComponent } from '../return-center/return-center.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: "/", component: DashboardComponent },
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "list", component: ListComponent },
      { path: "detail", component: DetailComponent },
      { path: "setting", component: SettingComponent },
      { path: "upload", component: UploadComponent },
      { path: "search", component: SearchComponent },
      { path: "404", component: NotfoundComponent },
      { path: "quotecenter", component:  QuoteCenterComponent},
      { path: "ordercenter", component:  OrderCenterComponent},
      { path: "returncenter", component:  ReturnCenterComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
