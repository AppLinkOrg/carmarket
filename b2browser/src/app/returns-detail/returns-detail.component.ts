import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';

@Component({
  selector: 'app-returns-detail',
  templateUrl: './returns-detail.component.html',
  styleUrls: ['./returns-detail.component.scss'],
  providers:[InstApi,OrderApi,EnterpriseApi]
})
export class ReturnsDetailComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi,
    public enterpriseApi:EnterpriseApi,
  ) { 
    super(router,activeRoute,instApi,enterpriseApi);
  }

  id = '';
  returndetail=null;
  returnitem=[];

  returnstatus = ''
  
  onMyShow(){

    this.activeRoute.queryParams.subscribe(queryParams=>{
      this.id = queryParams.id
    })

    this.orderApi.returndetail({id: this.id}).then((returndetail:any)=>{
      console.log(returndetail,'llllll')
      this.returnstatus = returndetail.orderstatus
      this.returndetail = returndetail
      this.returnitem = returndetail.tuihuoitem
    })
    

  }
  
  saveQuote(item){
    console.log(item)
    if(item.orderstatus=='R'){
      item.orderstatus = 'I'
    }else if(item.orderstatus=='I'){
      item.orderstatus='Y'
    }

    this.orderApi.updatereturnstatus(item).then((updatereturnstatus:any)=>{
      console.log(updatereturnstatus)
      if(updatereturnstatus.code=='0'){
        this.navigate('returnsManagement')
      }
    })


  }
}
