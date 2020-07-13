import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
import { CarApi } from 'src/providers/car.api';
import { MainComponent } from '../main/main.component';
import { ApiConfig } from '../api.config';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [InstApi, MemberApi,OrderApi,CarApi]
})
export class OrderDetailComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public enterpriseApi: EnterpriseApi,
    public orderApi: OrderApi,
    public carApi: CarApi,
  ) {
    super(router, activeRoute, instApi, memberApi,enterpriseApi);

  }

  onMyLoad() {
    this.params;
    this.type=this.params.type;
    this.primary_id=this.params.id;
  }
  type='';
  primary_id=0;
  list = null;
  orderItem=[];
  companylist=[];
  companyCode='';
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("order", "order");
    }
    this.orderApi.detail({id:this.primary_id}).then((detail:any)=>{
      this.list = detail;
      this.orderItem = detail.orderitem.filter(item=>{
        if(detail.id==item.order_id){
          return item
        }
      })
    })
    this.carApi.companylist({}).then((companylist:any)=>{
      this.companylist=companylist.data;
      console.log(this.companylist);
    })
  }
  fanhui(){
    this.navigate('/ordercenter',{type:this.type});
  }
  print(){
    var url=ApiConfig.getApiUrl()+'order/print?order_id='+this.primary_id;
    window.open(url);
  }
  quxiao=false;
  xuanze=false;
  ifquxiao(){
    this.orderApi.detail({ id: this.primary_id }).then((detailList:any)=>{

      if(detailList.order_status=="E"){
          this.quxiao=true;
      }
    })
  }
  changeStatus(){
    if(this.companyCode==''){
      this.xuanze=true;
      return
    }
    
    var that = this;
    this.list.order_status = "M"
      this.carApi.logistics({id:this.primary_id ,companyCode:this.companyCode}).then((logistics:any)=>{
          console.log(logistics);
          if(logistics.errorcode=='0'){
            
            that.orderApi.updatestatus({id: that.list.id, order_status: that.list.order_status, status: 'A'}).then((updatestatus:any)=>{
              this.hidemodel();
              if(updatestatus.code == 0){
                // that.router.navigate(['receiveGoodsDetail'],{ queryParams: { id: that.primary_id ,aa:3}});
                this.onMyShow();
                this.type='M';
              }
            })
          }else {

          }
      })
     
  }
}
