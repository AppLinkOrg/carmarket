import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { CarApi } from 'src/providers/car.api';


@Component({
  selector: 'app-send-goods-detail',
  templateUrl: './send-goods-detail.component.html',
  styleUrls: ['./send-goods-detail.component.scss'],
  providers:[InstApi,OrderApi,EnterpriseApi,CarApi]
})
export class SendGoodsDetailComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi: OrderApi,
    public enterpriseApi: EnterpriseApi,
    public carApi: CarApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }

  id = '';
  list = null;
  orderItem = [];
  companylist=[];
  onMyShow(){
    
    let oldtime = (new Date()).getTime() +  6*60*60*1000;
    window.localStorage.setItem('oldtime',oldtime.toString());
    this.activeRoute.queryParams.subscribe(queryParams=>{
      this.id = queryParams.id
    })

    var a = this.orderApi

    a.detail({ id: this.id }).then((detailList:any)=>{
    
      this.enterpriseApi.getemployeeinfo({id:detailList.baojia}).then((getemployeeinfo:any)=>{
        console.log(getemployeeinfo,'嘻嘻嘻嘻嘻')
        detailList.baojiaperson = getemployeeinfo.name
        detailList.baojiacom = getemployeeinfo.enterprise_name
      })

      this.list = detailList
      this.orderItem = detailList.orderitem.filter(item=>{
        if(detailList.id==item.order_id){
          return item
        }
      })
      console.log(this.list,'lllllllll')
      console.log( this.orderItem)

      this.orderApi.quoteinfo({id: this.list.quote_id}).then((quoteinfo:any)=>{
        console.log(quoteinfo)
        this.list.quote_time = quoteinfo.quote_time
      })

    })
   this.carApi.companylist({}).then((companylist:any)=>{
     this.companylist=companylist.data;
     console.log(this.companylist);
   })

  }
  companyCode='';
  ifquxiao(){
    this.orderApi.detail({ id: this.id }).then((detailList:any)=>{

      if(detailList.order_status=="E"){
          this.quxiao=true;
      }
    })
  }
  quxiao=false;
  xuanze=false;
  changeStatus(){

    if(this.companyCode==''){
      this.xuanze=true;
      return
    }
    var that = this;
    this.list.order_status = "M"
      this.carApi.logistics({id:this.id ,companyCode:this.companyCode}).then((logistics:any)=>{
          console.log(logistics);
          if(logistics.errorcode=='0'){
            that.orderApi.updatestatus({id: that.list.id, order_status: that.list.order_status, status: 'A'}).then((updatestatus:any)=>{
      
              if(updatestatus.code == 0){
                that.router.navigate(['receiveGoodsDetail'],{ queryParams: { id: that.id ,aa:3}});
              }
            })
          }else {

          }
      })
     
   
   
  }

  print(){
    // this.orderApi.print({order_id:this.id}).then((print:any)=>{
    //   console.log(this.id);
    //   console.log(print)
    // });

    window.open('https://cmsdev.app-link.org/alucard263096/carmarkets/api/order/print?order_id='+this.id);
  }
  fanhui(){
    this.navigate('orderManagement',{aa:this.params.aa})
  }
}

