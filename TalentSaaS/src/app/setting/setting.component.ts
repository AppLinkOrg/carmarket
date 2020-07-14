import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { ApiConfig } from '../api.config';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
import { AppUtil } from '../app.util';
declare let Chart: any;
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  providers: [InstApi, MemberApi,EnterpriseApi,OrderApi]
})
export class SettingComponent extends AppBase {
  loading=false;

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
    var now = new Date();
    var year = now.getFullYear();
    this.today = year + "-" + AppUtil.ten2(now.getMonth() + 1) + "-" + AppUtil.ten2(now.getDate());
    this.datefrom = year + "-" + AppUtil.ten2(1) + "-" + AppUtil.ten2(1);
    this.dateto = year + "-" + AppUtil.ten2(now.getMonth() + 1) + "-" + AppUtil.ten2(now.getDate());
  }
  today='';
  datefrom='';
  dateto='';
  tabtype = 'account';

  targethuman = 0;
  targetorder = 0;
  targetclient = 0;
  targetamount = 0;
  zizhi=[];
  fileList1=[];
  allenterprise=[];
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("setting", "setting");
    }
    this.enterpriseApi.allenterprise({enterprise_id:this.memberinfo.enterprise.id }).then((allenterprise:any)=>{
        this.allenterprise=allenterprise;
    })
    this.changtype(this.type);
  }
  changquan(item){
    item.power_value= item.power_value=='Y'?'N':'Y';
    this.enterpriseApi.updatepower({id: item.id, power: 'N'}).then((updatepower:any)=>{
      
    })
  }
  money=0;
  error='';
  applytixian(){
    var totalmoney=this.memberinfo.enterprise.account_money;
    console.log(totalmoney);
    console.log(this.money);
    if(this.money>0){
      if(totalmoney >= Number(this.money)){
        this.enterpriseApi.addtixian({enterprise_id:this.memberinfo.enterprise.id,money:this.money,status:'A'}).then((addtixian)=>{
          console.log(addtixian,'addtixian')
          if(addtixian){
            this.orderApi.updatemoney({id:this.memberinfo.enterprise.id,money:this.money}).then((updatemoney)=>{
              console.log(updatemoney)
              
            })
            this.hidemodel();
            this.error=""
            this.onMyShow();
          }
        })
      }else {
        this.error='提现金额太大了，余额不足！'
      }
     
    }else {
      this.error='提现金额小于0，请重新填入！'
    }
  }
  type='';
  totalMoney=0;
  changtype(type){
    this.type=type;
    this.search();
  }
  search(){
    this.pageList=[];
    this.orderApi.employeesales({
      datefrom:this.datefrom,
      dateto:this.dateto,
      orderno:this.orderno,
      id:this.memberinfo.id
    }).then((employeesales:any)=>{
        var list=[];
        if(this.type=='N'){
          list=employeesales.orderlist;
        }else if(this.type=='Y'){
          list=employeesales.returnlist;
        }else {
          list=employeesales.orderlist.concat(employeesales.returnlist);
        }
      
      for(var i=0;i<list.length;i++){
        list[i].index=i;
      }
      this.totalMoney=employeesales.totalMoney;
      this.pagination(list,list.length);
    })
  }
  orderno='';
  reset(){
    this.orderno='';
    this.onMyLoad();
    this.search();
  }
}
