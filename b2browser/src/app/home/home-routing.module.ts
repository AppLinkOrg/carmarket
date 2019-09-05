import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { TestComponent } from '../test/test.component';
import { BlankComponent } from '../blank/blank.component';
import { StoreHomeComponent } from '../store-home/store-home.component';
import { QuotationCenterComponent } from '../quotation-center/quotation-center.component';
import { QuotationDetailsComponent } from '../quotation-details/quotation-details.component';
import { DetailsOfQuotedPriceComponent } from '../details-of-quoted-price/details-of-quoted-price.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "blank", component: BlankComponent },
      { path: "test", component: TestComponent },
      { path: "storeHome", component: StoreHomeComponent },
      { path: "quotationCenter", component: QuotationCenterComponent },
      { path: "quotationDetails", component: QuotationDetailsComponent },
      { path: "detailsOfQuotedPrice", component: DetailsOfQuotedPriceComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
