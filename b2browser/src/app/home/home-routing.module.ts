import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { BlankComponent } from '../blank/blank.component';
import { StoreHomeComponent } from '../store-home/store-home.component';
import { QuotationCenterComponent } from '../quotation-center/quotation-center.component';
import { QuotationDetailsComponent } from '../quotation-details/quotation-details.component';
import { DetailsOfQuotedPriceComponent } from '../details-of-quoted-price/details-of-quoted-price.component';
import { OrderManagementComponent } from '../order-management/order-management.component';
import { SendGoodsDetailComponent } from '../send-goods-detail/send-goods-detail.component';
import { ReceivedGoodsDetailComponent } from '../received-goods-detail/received-goods-detail.component';
import { FinishDetailComponent } from '../finish-detail/finish-detail.component';
import { ManagementCenterComponent } from '../management-center/management-center.component';
import { ReturnsManagementComponent } from '../returns-management/returns-management.component';
import { ReturnsDetailComponent } from '../returns-detail/returns-detail.component';
import { CancelDetailComponent } from '../cancel-detail/cancel-detail.component';
import { AchievementComponent } from '../achievement/achievement.component';
import { EmployeeManagementComponent } from '../employee-management/employee-management.component';
import { WaitingComponent } from '../waiting/waiting.component';
import { ConsumeComponent } from '../consume/consume.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "blank", component: BlankComponent },
      { path: "storeHome", component: StoreHomeComponent },
      { path: "quotationCenter", component: QuotationCenterComponent },
      { path: "quotationDetails", component: QuotationDetailsComponent },
      { path: "detailsOfQuotedPrice", component: DetailsOfQuotedPriceComponent},
      { path: "orderManagement", component: OrderManagementComponent},
      { path: "sendGoodsDetail", component: SendGoodsDetailComponent},
      { path: "receiveGoodsDetail", component: ReceivedGoodsDetailComponent},
      { path: "finishDetail", component: FinishDetailComponent},
      { path: "cancelDetail", component: CancelDetailComponent},
      { path: "managementCenter", component: ManagementCenterComponent},
      { path: "employeeManagement", component: EmployeeManagementComponent},
      { path: "returnsManagement", component: ReturnsManagementComponent},
      { path: "returnsDetail", component: ReturnsDetailComponent},
      { path: "achievement", component: AchievementComponent},
      { path: "waiting", component: WaitingComponent},
      { path: "consume", component: ConsumeComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
