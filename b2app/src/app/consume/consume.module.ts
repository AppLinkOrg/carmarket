import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsumePageRoutingModule } from './consume-routing.module';

import { ConsumePage } from './consume.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsumePageRoutingModule
  ],
  declarations: [ConsumePage]
})
export class ConsumePageModule {}
