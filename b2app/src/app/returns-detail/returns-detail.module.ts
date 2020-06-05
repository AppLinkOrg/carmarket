import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnsDetailPageRoutingModule } from './returns-detail-routing.module';

import { ReturnsDetailPage } from './returns-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnsDetailPageRoutingModule
  ],
  declarations: [ReturnsDetailPage]
})
export class ReturnsDetailPageModule {}
