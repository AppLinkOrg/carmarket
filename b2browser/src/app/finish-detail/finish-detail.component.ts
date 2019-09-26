import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';


@Component({
  selector: 'app-finish-detail',
  templateUrl: './finish-detail.component.html',
  styleUrls: ['./finish-detail.component.scss'],
  providers:[InstApi,OrderApi]
})
export class FinishDetailComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi
  ) { 
    super(router,activeRoute,instApi);
  }
   
  id = ''
  list = null
  orderItem = []

  onMyShow(){
    

    this.activeRoute.queryParams.subscribe(queryParams=>{
      this.id = queryParams.id
      
      var a = this.orderApi
      a.detail({ id: this.id }).then((detailList:any)=>{
      
        this.list = detailList
        this.orderItem = detailList.orderitems;

        console.log(this.list)

        this.orderApi.quoteinfo({id: this.list.quote_id}).then((quoteinfo:any)=>{
          console.log(quoteinfo)
          this.list.quote_time = quoteinfo.quote_time
        })

      })
    })
     
  }
}
