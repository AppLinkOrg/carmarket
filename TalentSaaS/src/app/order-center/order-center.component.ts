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
  selector: 'app-order-center',
  templateUrl: './order-center.component.html',
  styleUrls: ['./order-center.component.scss'],
  providers: [InstApi, MemberApi,OrderApi]
})
export class OrderCenterComponent extends AppBase {

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
    if(this.params.type!=undefined){
      this.type=this.params.type;
    }
  }
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("order", "order");
    }
    this.inloop=true;
    this.changtype(this.type);
    this.comlen();
  }
  changtype(type){
    this.type=type;
    this.getlist();
  }
  alllen = 0;
  falen = 0;
  shoulen = 0;
  wanlen = 0;
  qulen = 0;
  fulen = 0;
  inloop=false;
  ngOnDestroy() {
    this.inloop=false;
  }
  comlen(){
    this.orderApi.ordernum({}).then((ordernum:any)=>{
      if(ordernum){
        this.alllen=ordernum.allorder;
        this.falen=ordernum.daifahuo;
        this.shoulen=ordernum.daishouhuo;
        this.wanlen=ordernum.yiwancheng;
        this.qulen=ordernum.yiquxiao;
        this.fulen=ordernum.daifukuan;
      }

      if(this.inloop==true){
        setTimeout(()=>{
          this.comlen();
        },3000);
      }

    })
  }
  mylist=[];
  getlist(){
    this.pageList=[];
    console.log(this.memberinfo,'memner');
    this.orderApi.mylist({enterprise_id: this.memberinfo.enterprise_id, baojia: this.memberinfo.id, order_status: this.type ,orderby:'r_main.orderno desc'}).then((mylist:any)=>{
      for(var i=0;i<mylist.length;i++){
        mylist[i].index=i;
      }
      this.pagination(mylist,mylist.length);
      if(this.inloop==true){
        setTimeout(()=>{
          this.changtype(this.type);
        },4000);
      }
    })
  }
  todetail(item){
    var id = item.id;
    var type='';
    if(this.type==''){
      type= item.order_status;
    }else {
      type = this.type;
    }
    this.orderApi.editisread({ order_id: item.id, enterprise_id: this.memberinfo.enterprise.id, employee_id: this.memberinfo.id }).then((ret) => {
      this.navigate('/orderdetail',{id:id,type:type})
    })
   
  }
}
