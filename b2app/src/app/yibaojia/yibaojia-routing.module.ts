import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YibaojiaPage } from './yibaojia.page';

const routes: Routes = [
  {
    path: '',
    component: YibaojiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YibaojiaPageRoutingModule {}
