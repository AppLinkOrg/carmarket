import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';


@Component({
  selector: 'app-consume',
  templateUrl: './consume.component.html',
  styleUrls: ['./consume.component.scss'],
  providers:[OrderApi]
})
export class ConsumeComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }
  consumelist=null
  onMyShow(){
    console.log(this.params,'llll')
    this.orderApi.consumelist({enterprise_id:this.params.enterprise_id}).then((consumelist)=>{
      console.log(consumelist)
      this.consumelist = consumelist
    })
  } 

}
