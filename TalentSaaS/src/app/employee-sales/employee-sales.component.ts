import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
import { MainComponent } from '../main/main.component';
import { AppUtil } from '../app.util';

@Component({
  selector: 'app-employee-sales',
  templateUrl: './employee-sales.component.html',
  styleUrls: ['./employee-sales.component.scss'],
  providers: [InstApi, MemberApi,OrderApi]
})
export class EmployeeSalesComponent extends AppBase {

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
  datefrom = "";
  dateto = "";
  today = "";
  allenterprise=[];
  onMyLoad() {
    this.params;
    var now = new Date();
    var year = now.getFullYear();
    this.today = year + "-" + AppUtil.ten2(now.getMonth() + 1) + "-" + AppUtil.ten2(now.getDate());
    this.datefrom = year + "-" + AppUtil.ten2(1) + "-" + AppUtil.ten2(1);
    this.dateto = year + "-" + AppUtil.ten2(now.getMonth() + 1) + "-" + AppUtil.ten2(now.getDate());
  }
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("setting", "setting");
    }
    this.enterpriseApi.allenterprise({enterprise_id:this.memberinfo.enterprise.id}).then((allenterprise:any)=>{
      this.allenterprise=allenterprise;
    })
    this.changtype(this.type);
  }
  getid(){
    for(let item of this.allenterprise){
      if(item.mobile==this.mobile){
        return item.id
      }
    }
    return -1
  }
  type='';
  totalMoney='';
  changtype(type){
    this.type=type;
    this.search();
  }
  name='';
  mobile='';
  orderno='';
  json1={};
  list=[];
  search(){
    this.pageList=[];
    var mobile='';
    if(this.mobile!=''){
      mobile= this.getid();
    }
    var json=null;
    json=this.json1;
    json.id=this.name;
    json.mobile=mobile;
    json.orderno=this.orderno;
    json.datefrom=this.datefrom;
    json.dateto=this.dateto;
    this.orderApi.employeesales(json).then((employeesales:any)=>{
      
      if(this.type=='N'){
        this.list=employeesales.orderlist;
      }else if(this.type=='Y'){
        this.list=employeesales.returnlist;
      }else {
        this.list=employeesales.orderlist.concat(employeesales.returnlist);
      }
      for(var i=0;i<this.list.length;i++){
        this.list[i].index=i;
      }
      console.log(this.list);
      this.totalMoney=employeesales.totalMoney;
      this.pagination(this.list,this.list.length);
      console.log(employeesales);
    })
  }
  reset(){
    this.name='';
    this.mobile='';
    this.orderno='';
    this.onMyLoad();
    this.search();
  }
}
