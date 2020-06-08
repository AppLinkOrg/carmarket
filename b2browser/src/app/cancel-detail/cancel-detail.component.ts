import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';


@Component({
  selector: 'app-cancel-detail',
  templateUrl: './cancel-detail.component.html',
  styleUrls: ['./cancel-detail.component.scss'],
  providers:[InstApi,OrderApi,EnterpriseApi]
})
export class CancelDetailComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi,
    public enterpriseApi:EnterpriseApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }


  id = '';
  list = null;
  orderItem = [];

  onMyShow(){
    let oldtime = (new Date()).getTime() +  6*60*60*1000;
    window.localStorage.setItem('oldtime',oldtime.toString())

    this.activeRoute.queryParams.subscribe(queryParams=>{
      this.id = queryParams.id
    })

    var a = this.orderApi

    a.detail({ id: this.id }).then((detailList:any)=>{
    
      this.list = detailList
      this.orderItem = detailList.orderitems;
     
    })
   

  }
  fanhui(){
    this.navigate('orderManagement',{aa:this.params.aa})
  }
}
