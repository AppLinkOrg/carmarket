import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.scss'],
  providers:[InstApi,EnterpriseApi]
})
export class AuthorityComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }
  change= "A";
  list=[];
  onMyShow(){
    console.log(this.operatorinfo.enterprise_id,'111')
    this.enterpriseApi.employeeinfo({ }).then((employeeinfo:any)=>{
      this.enterpriseApi.allenterprise({
        enterprise_id: employeeinfo.enterprise_id,
        position:'C'
      }).then( (list:any) => {
        console.log(list,'1111111')
        this.list=list;
      });
   });
  }

}