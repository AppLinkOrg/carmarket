import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'consume',
    loadChildren: () => import('./consume/consume.module').then( m => m.ConsumePageModule)
  },
  {
    path: 'achievement',
    loadChildren: () => import('./achievement/achievement.module').then( m => m.AchievementPageModule)
  },
  {
    path: 'returns-detail',
    loadChildren: () => import('./returns-detail/returns-detail.module').then( m => m.ReturnsDetailPageModule)
  },
  {
    path: 'order-detail',
    loadChildren: () => import('./order-detail/order-detail.module').then( m => m.OrderDetailPageModule)
  },
  {
    path: 'quotation-detail',
    loadChildren: () => import('./quotation-detail/quotation-detail.module').then( m => m.QuotationDetailPageModule)
  },
  {
    path: 'yibaojia',
    loadChildren: () => import('./yibaojia/yibaojia.module').then( m => m.YibaojiaPageModule)
  },
  // {
  //   path: 'tab5',
  //   loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  // }
  // {
  //   path: 'tab4',
  //   loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  // },
   
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
