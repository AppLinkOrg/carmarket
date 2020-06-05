import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';


@Component({
  selector: 'app-finish-detail',
  templateUrl: './finish-detail.component.html',
  styleUrls: ['./finish-detail.component.scss'],
  providers:[InstApi,OrderApi,EnterpriseApi]
})
export class FinishDetailComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi,
    public enterpriseApi:EnterpriseApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }
   
  id = ''
  list = null
  orderItem = []

  onMyShow(){
    
    let oldtime = (new Date()).getTime() + 6*60*60*1000;
    window.localStorage.setItem('oldtime',oldtime.toString())
    
    this.activeRoute.queryParams.subscribe(queryParams=>{
      this.id = queryParams.id
      
      var a = this.orderApi
      a.detail({ id: this.id }).then((detailList:any)=>{

        this.enterpriseApi.getemployeeinfo({id:detailList.baojia}).then((getemployeeinfo:any)=>{
          console.log(getemployeeinfo,'嘻嘻嘻嘻嘻')
          detailList.baojiaperson = getemployeeinfo.name
          detailList.baojiacom = getemployeeinfo.enterprise_name
        })
          console.log(detailList,'detailList')
        this.list = detailList
        this.orderItem = detailList.orderitem.filter(item=>{
          if(detailList.id==item.order_id){
            return item
          }
        })

        console.log(this.list)

        this.orderApi.quoteinfo({id: this.list.quote_id}).then((quoteinfo:any)=>{
          console.log(quoteinfo)
          this.list.quote_time = quoteinfo.quote_time
        })

      })
    })
     
  }
  print(){
    window.open('https://cmsdev.app-link.org/alucard263096/carmarkets/api/order/print?order_id='+this.id);
  }
  fanhui(){
    this.navigate('orderManagement',{aa:this.params.aa})
  }
}
