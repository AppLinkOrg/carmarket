import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BlankComponent } from '../blank/blank.component';
import { FormsModule } from '@angular/forms';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxUploaderModule } from 'ngx-uploader';
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
import { WatchorderComponent } from '../watchorder/watchorder.component';
import { WaitsendComponent } from '../waitsend/waitsend.component';
import { WaitreceiveComponent } from '../waitreceive/waitreceive.component';
import { SuccessComponent } from '../success/success.component';
import { ChangeapplyComponent } from '../changeapply/changeapply.component';
import { ObligationsComponent } from '../obligations/obligations.component';
import { MyComponent } from '../my/my.component';
import { JiaoyijiluComponent } from '../jiaoyijilu/jiaoyijilu.component';
import { EditComponent } from '../edit/edit.component';
import { AccountComponent } from '../account/account.component';
import { HelpcenterComponent } from '../helpcenter/helpcenter.component';
import { ChangeComponent } from '../change/change.component';
import { AuthorityComponent } from '../authority/authority.component';
import { AddressComponent } from '../address/address.component';
import { OrderComponent } from '../order/order.component';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { AddressaddComponent } from '../addressadd/addressadd.component';
@NgModule({
  declarations: [
    HomeComponent,
    BlankComponent,
    StoreHomeComponent,
    QuotationCenterComponent,
    QuotationDetailsComponent,
    DetailsOfQuotedPriceComponent,
    OrderManagementComponent,
    SendGoodsDetailComponent,
    ReceivedGoodsDetailComponent,
    FinishDetailComponent,
    CancelDetailComponent,
    ManagementCenterComponent,
    EmployeeManagementComponent,
    ReturnsManagementComponent,
    ReturnsDetailComponent,
    AchievementComponent,
    WaitingComponent,
    ConsumeComponent,
    WatchorderComponent,
    WaitsendComponent,
    WaitreceiveComponent,
    SuccessComponent,
    ChangeapplyComponent,
    ObligationsComponent,
    MyComponent,
    JiaoyijiluComponent,
    EditComponent,
    AccountComponent,
    HelpcenterComponent,
    ChangeComponent,
    AuthorityComponent,
    AddressComponent,
    AboutusComponent,
    OrderComponent,
    AddressaddComponent,
    DashboardComponent,],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    NgxUploaderModule,
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class HomeModule { }
