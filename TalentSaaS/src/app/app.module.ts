import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainModule } from './main/main.module';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { HttpClientModule } from '@angular/common/http';
import { BlankComponent } from './blank/blank.component';
import { FormsModule } from '@angular/forms';
import { SettingComponent } from './setting/setting.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { UploadComponent } from './upload/upload.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { InstApi } from 'src/providers/inst.api';

import { MemberApi } from 'src/providers/member.api';
import { ContentComponent } from './content/content.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SearchComponent } from './search/search.component';
import { APP_BASE_HREF } from '@angular/common';
import { QuoteCenterComponent } from './quote-center/quote-center.component';
import { OrderCenterComponent } from './order-center/order-center.component';
import { ReturnCenterComponent } from './return-center/return-center.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LockscreenComponent,
    ListComponent,
    DetailComponent,
    BlankComponent,
    SettingComponent,
    NotfoundComponent,
    UploadComponent,
    ResetPasswordComponent,
    ContentComponent,
    SearchComponent,
    QuoteCenterComponent,
    OrderCenterComponent,
    ReturnCenterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxUploaderModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    NgxEchartsModule,
    NzIconModule
  ],
  providers: [MemberApi, InstApi, { provide: NZ_I18N, useValue: zh_CN },{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
