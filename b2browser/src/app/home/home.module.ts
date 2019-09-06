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
import { TestComponent } from '../test/test.component';
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

@NgModule({
  declarations: [
    HomeComponent,
    BlankComponent,
    TestComponent,
    StoreHomeComponent,
    QuotationCenterComponent,
    QuotationDetailsComponent,
    DetailsOfQuotedPriceComponent,
    OrderManagementComponent,
    SendGoodsDetailComponent,
    ReceivedGoodsDetailComponent,
    FinishDetailComponent,
    ManagementCenterComponent,
    ReturnsManagementComponent,
    ReturnsDetailComponent,
    DashboardComponent],
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
