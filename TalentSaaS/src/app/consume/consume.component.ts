import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-consume',
  templateUrl: './consume.component.html',
  styleUrls: ['./consume.component.scss'],
  providers: [InstApi, MemberApi,OrderApi]
})
export class ConsumeComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public enterpriseApi: EnterpriseApi,
    public orderApi: OrderApi,
  ) {
    super(router, activeRoute, instApi, memberApi,enterpriseApi);

  }

  onMyLoad() {
    this.params;
  }
  allenterprise=[];
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("setting", "setting");
    }

    this.enterpriseApi.allenterprise({enterprise_id:this.memberinfo.enterprise.id}).then((allenterprise:any)=>{
      this.allenterprise=allenterprise;
    })
    this.search();
  }
  name='';
  shijian='';
  search(){
    this.pageList=[];
    this.orderApi.consumelist({
      enterprise_id:this.memberinfo.enterprise.id,
      orderby:'r_main.consume_time desc',
      employee_id:this.name,
      dateto:this.shijian
    }).then((consumelist:any)=>{
      this.pagination(consumelist,consumelist.length);
    })
  }
  reset(){
    this.name='';
    this.shijian='';
    this.search();
  }
}
