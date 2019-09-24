import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';


@Component({
  selector: 'app-cancel-detail',
  templateUrl: './cancel-detail.component.html',
  styleUrls: ['./cancel-detail.component.scss'],
  providers:[InstApi,OrderApi]
})
export class CancelDetailComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi
  ) { 
    super(router,activeRoute,instApi);
  }


  id = '';
  list = null;
  orderItem = [];

  onMyShow(){
    

    this.activeRoute.queryParams.subscribe(queryParams=>{
      this.id = queryParams.id
    })

    var a = this.orderApi

    a.detail({ id: this.id }).then((detailList:any)=>{
    
      this.list = detailList
      this.orderItem = detailList.orderitems;
     
    })
   

  }
}
