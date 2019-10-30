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
    super(router,activeRoute,instApi,enterpriseApi);
  }
   
  id = ''
  list = null
  orderItem = []

  onMyShow(){
    

    this.activeRoute.queryParams.subscribe(queryParams=>{
      this.id = queryParams.id
      
      var a = this.orderApi
      a.detail({ id: this.id }).then((detailList:any)=>{
          console.log(detailList,'detailList')
        this.list = detailList
        this.orderItem = detailList.orderitem;

        console.log(this.list)

        this.orderApi.quoteinfo({id: this.list.quote_id}).then((quoteinfo:any)=>{
          console.log(quoteinfo)
          this.list.quote_time = quoteinfo.quote_time
        })

      })
    })
     
  }
}
