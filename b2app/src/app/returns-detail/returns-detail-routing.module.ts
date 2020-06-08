import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnsDetailPage } from './returns-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnsDetailPageRoutingModule {}
