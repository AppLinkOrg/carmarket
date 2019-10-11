import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-returns-detail',
  templateUrl: './returns-detail.component.html',
  styleUrls: ['./returns-detail.component.scss'],
  providers:[InstApi,OrderApi]
})
export class ReturnsDetailComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi
  ) { 
    super(router,activeRoute,instApi);
  }

  id = '';
  returndetail=null;
  returnitem=[];
  
  onMyShow(){

    this.activeRoute.queryParams.subscribe(queryParams=>{
      this.id = queryParams.id
    })

    this.orderApi.detail({id: this.id}).then((returndetail:any)=>{

      this.returndetail = returndetail
      this.returnitem = returndetail.orderitems
    })
    

  }

}
