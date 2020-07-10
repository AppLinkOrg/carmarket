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
  selector: 'app-return-center',
  templateUrl: './return-center.component.html',
  styleUrls: ['./return-center.component.scss'],
  providers: [InstApi, MemberApi,OrderApi]
})
export class ReturnCenterComponent extends AppBase {

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
  type='';
  onMyLoad() {
    this.params;
  }
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("return", "return");
    }
    this.getlist();
  }
  changtype(type){
    this.type=type;
    this.getlist();
  }
  alllen=0;
  daituilen=0;
  yituilen=0;
  tuizhonglen=0;
  comlen(){
    this.orderApi.ordernum({}).then((ordernum:any)=>{
      if(ordernum){
        this.alllen=ordernum.allreturn;
        this.daituilen=ordernum.rdaitui;
        this.yituilen=ordernum.rtuizhong;
        this.tuizhonglen=ordernum.ryitui;
      }
    })
  }
  returnlist=[];
  getlist(){
    console.log(this.memberinfo,'memner');
    this.orderApi.returnlist({gongsi: this.memberinfo.enterprise_id, baojia: this.memberinfo.id,orderstatus:this.type}).then((returnlist:any)=>{
      for(var i=0;i<returnlist.length;i++){
        returnlist[i].index=i;
      }
      this.pagination(returnlist,returnlist.length);
    })
  }
}
