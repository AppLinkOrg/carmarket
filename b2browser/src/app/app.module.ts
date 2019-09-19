import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HttpClientModule }    from '@angular/common/http';
import { InstApi } from 'src/providers/inst.api';
import { BlankComponent } from './blank/blank.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { HomeComponent } from './home/home.component';

import {FormsModule} from '@angular/forms';


import { AlertModule } from 'ngx-bootstrap/alert';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TestComponent } from './test/test.component';
import { StoreHomeComponent } from './store-home/store-home.component';
import { QuotationCenterComponent } from './quotation-center/quotation-center.component';
import { QuotationDetailsComponent } from './quotation-details/quotation-details.component';
import { DetailsOfQuotedPriceComponent } from './details-of-quoted-price/details-of-quoted-price.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { SendGoodsDetailComponent } from './send-goods-detail/send-goods-detail.component';
import { ReceivedGoodsDetailComponent } from './received-goods-detail/received-goods-detail.component';
import { FinishDetailComponent } from './finish-detail/finish-detail.component';
import { ManagementCenterComponent } from './management-center/management-center.component';
import { ReturnsManagementComponent } from './returns-management/returns-management.component';
import { ReturnsDetailComponent } from './returns-detail/returns-detail.component';
import { CancelDetailComponent } from './cancel-detail/cancel-detail.component';
import { AchievementComponent } from './achievement/achievement.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidemenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [InstApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
