import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YibaojiaPageRoutingModule } from './yibaojia-routing.module';

import { YibaojiaPage } from './yibaojia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YibaojiaPageRoutingModule
  ],
  declarations: [YibaojiaPage]
})
export class YibaojiaPageModule {}
