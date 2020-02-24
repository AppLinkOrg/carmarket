import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuotationDetailPageRoutingModule } from './quotation-detail-routing.module';

import { QuotationDetailPage } from './quotation-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuotationDetailPageRoutingModule
  ],
  declarations: [QuotationDetailPage]
})
export class QuotationDetailPageModule {}
