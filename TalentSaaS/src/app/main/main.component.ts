import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [InstApi, MemberApi,EnterpriseApi,OrderApi]
})
export class MainComponent extends AppBase {
  static Instance: MainComponent = null;
  instinfo = null;
  toggle = false;
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public enterpriseApi: EnterpriseApi,
    public orderApi: OrderApi,
  ) {
    super(router, activeRoute, instApi, memberApi,enterpriseApi);
    this.instinfo = {};
    this.instApi.info({ unicode: "carmarkets" }).then((instinfo) => {
      this.instinfo = instinfo;
    });
    MainComponent.Instance = this;
  }


  module = "home";
  module2 = "";


  onMyLoad() {

  }

  newhuman = 0;
  neworder = 0;

  onMyShow() {
    var today = new Date();
    var timespan = today.getTime();

    // this.memberApi.keywordquick({}).then((list: []) => {
    //   this.searchkeyquicklist = list;
    // });

    //alert(this.memberinfo.expireddatetimespan);
    //alert(this.memberinfo.expireddatetimespan/24/3600/1000);
    //alert(timespan/24/3600/1000);
    if (this.memberinfo != null
      &&
      this.memberinfo.expireddatetimespan / 24 / 3600 / 1000 - timespan / 24 / 3600 / 1000 < 30) {
      this.warning("Account Expired", "Your license would be expired in " + this.memberinfo.manpower.expired_date + ", please content support to update your license.");
    }
  }

  


  setModule(module, module2) {
    this.module = module;
    this.module2 = module2;
    this.refreshSummary();
  }
  recentunreadlist = [];
  infoboxsummary = {
    unreadcount: 0
  };
  searchkey = "";

  searchkeyquicklist = [];

  employee_id=0;
  enterprise_id=0;
  quotereadnum=0;
  ordernum=0;
  returnnum=0;
  refreshSummary() {
    this.searchkey="";

    this.enterpriseApi.employeeinfo({}).then((employeeinfo: any) => {


      if (employeeinfo.enterprise_id == "0") {
        this.router.navigate(["login"]);
        return
      }
      this.employee_id = employeeinfo.id;
      this.enterprise_id = employeeinfo.enterprise_id


    
      var arrs = [];

    this.orderApi.orderisread({ enterprise_id: this.enterprise_id, employee_id: this.employee_id }).then((ret: any) => {
      if (ret) {
      
          this.quotereadnum = ret.quote;
         
          this.ordernum = ret.order;
         

          this.returnnum = ret.returns;

      }
    })
  })
  }

  toggleSidebar() {
    console.log('jjjjjj')
    this.toggle = !this.toggle;

  }
  changlan(val) {
    console.log(val, '123123')
    window.localStorage.setItem("langcode", val);
    window.location.reload();
  }
  getSearchList(key){
    var list=[];      
    for(var item of this.searchkeyquicklist){
      if(item.name.indexOf(key)>-1){
        list.push(item);
        if(list.length>=7){
          return list;
        }
      }
    }
    return list;
  }

}
