import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { MainComponent } from '../main/main.component';

declare let Chart: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [InstApi, MemberApi]
})
export class DashboardComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public enterpriseApi: EnterpriseApi,
  ) {
    super(router, activeRoute, instApi, memberApi,enterpriseApi);
  }

  waitprocesshuman = 0;
  waitprocessorder = 0;
  processedorder = 0;
  unreadcount = 0;

  monthhumanadd = 0;
  monthclientadd = 0;
  monthorderadd = 0;
  monthamountadd = 0;

  lastmonthhumanadd = 0;
  lastmonthclientadd = 0;
  lastmonthorderadd = 0;
  lastmonthamountadd = 0;

  latestorder = [];
  startdate=new Date();
  enddate=new Date();


  processcount=0;
  clientcount=0;
  humancount=0;
  ordercount=0;
  infomsgcount=0;


  allorder=0;
  daifahuo=0;
  daituihuo=0;
  monincome=0;
  monorder=0;
  todayincome=0;
  yituihuo=0;
  yiwancheng=0;
  onMyShow() {

    this.startdate=new Date(this.startdate.getFullYear(),0,1);

    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("home", "");
    }

    this.memberApi.dashboard({}).then((ret: any) => {
      console.log(ret);
      if(ret==undefined){
        return;
      }
      this.allorder = ret.allorder;
      this.daifahuo = ret.daifahuo;
      this.daituihuo = ret.daituihuo;
      this.monincome = ret.monincome;
      this.monorder = ret.monorder;
      this.todayincome = ret.todayincome;
      this.yituihuo = ret.yituihuo;
      this.yiwancheng = ret.yiwancheng;

     

      this.latestorder=ret.latestorder;


    });








  }

  getpercent(fenzi, fenmu) {

    console.log("fenzifenmu", fenzi, fenmu);
    if (Number(fenmu) <= 0) {
      return "0%";
    }
    if (Number(fenzi) > Number(fenmu)) {
      return "100%";
    }
    return (Number(fenzi) * 100.0 / Number(fenmu)).toFixed(0) + "%";
  }

  huanbi(thismonth, lastmonth) {
    if (Number(lastmonth) <= 0) {
      return "--";
    }
    return ((Number(thismonth) - Number(lastmonth)) * 100.0 / Number(lastmonth)).toFixed(0) + "%";
  }

  

}
