import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';


@Component({
  selector: 'app-received-goods-detail',
  templateUrl: './received-goods-detail.component.html',
  styleUrls: ['./received-goods-detail.component.scss'],
  providers:[InstApi,OrderApi,EnterpriseApi]
})
export class ReceivedGoodsDetailComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi,
    public enterpriseApi:EnterpriseApi,
  ) { 
    super(router,activeRoute,instApi,enterpriseApi);
  }
  
  
  id = ''
  list = null;
  orderItem = []

  onMyShow(){
    

    this.activeRoute.queryParams.subscribe(queryParams=>{
      this.id = queryParams.id
   
    var a = this.orderApi    

      a.detail({ id: this.id}).then((detailList:any)=>{

        this.enterpriseApi.getemployeeinfo({id:detailList.baojia}).then((getemployeeinfo:any)=>{
          console.log(getemployeeinfo,'嘻嘻嘻嘻嘻')
          detailList.baojiaperson = getemployeeinfo.name
          detailList.baojiacom = getemployeeinfo.enterprise_name
        })
     
        this.list = detailList
        this.orderItem = detailList.orderitem;

        this.orderApi.quoteinfo({id: this.list.quote_id}).then((quoteinfo:any)=>{
          console.log(quoteinfo)
          this.list.quote_time = quoteinfo.quote_time
        })

      })

    })    

  }
  
}