import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-quotation-details',
  templateUrl: './quotation-details.component.html',
  styleUrls: ['./quotation-details.component.scss'],
  providers:[InstApi,OrderApi]
})
export class QuotationDetailsComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi
  ) { 
    super(router,activeRoute,instApi);
  }


  // quoteinfo="";
  quoteinfo: void | Object='';
  id='';
  onMyShow(){
    
    this.activeRoute.queryParams.subscribe(queryParams=>{
      // console.log(queryParams)
      this.id = queryParams.id
    })
    console.log(this.id)
    var a = this.orderApi
    a.quoteinfo({ id: this.id }).then((quoteinfo)=>{

      
      this.quoteinfo= quoteinfo;
      console.log(this.quoteinfo)

    })

  }

}