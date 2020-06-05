import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-changedetail',
  templateUrl: './changedetail.component.html',
  styleUrls: ['./changedetail.component.scss'],
  providers:[InstApi,EnterpriseApi]
})
export class ChangedetailComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }
  info={};
  onMyShow(){
    if(this.params.id.order_id!=undefined){
      this.orderApi.returnlist({
        order_id: this.params.id.order_id
      }).then( (returnlist:any) => {
        var info = returnlist[0];
        info.tuihuoitem = returnlist[0].returnitem
        this.info=info;
      });
    }else {
      this.orderApi.returndetail({
        id: this.params.id
      }).then( (info:any) => {
        this.info=info;
      });
    }
  }

}
