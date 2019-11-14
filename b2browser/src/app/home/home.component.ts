import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[InstApi,EnterpriseApi,OrderApi]
})
export class HomeComponent  extends AppBase  {

  toggle=false;
  instinfo=null;
  public operatorinfo:any = {
    name: '',
    enterprise: {
      name: ''
    }
  }

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public OrderApi:OrderApi,
  ) { 
    super(router,activeRoute,instApi,OrderApi,enterpriseApi);

    this.instinfo={};
    this.instApi.info({unicode:"carmarkets"}).then((instinfo)=>{

      this.instinfo=instinfo;
    });
  }

  enterprise_id = ''
  employee_id = ''
  obj = null

  onMyShow(){

    this.activeRoute.queryParams.subscribe((aa)=>{
      console.log(aa)

      if(aa.result == 'yes'){
        this.enterpriseApi.employeeinfo({ }).then((employeeinfo:any)=>{
          console.log(employeeinfo)
          this.enterprise_id = employeeinfo.enterprise_id
          this.employee_id = employeeinfo.id
    
          this.obj = employeeinfo
          
        })
      }
      

    })

  

  }

  toggleSidebar(){
    this.toggle=!this.toggle;
  }


}
