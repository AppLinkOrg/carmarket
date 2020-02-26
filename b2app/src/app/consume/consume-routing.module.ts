import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsumePage } from './consume.page';

const routes: Routes = [
  {
    path: '',
    component: ConsumePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumePageRoutingModule {}
