import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-helpcenter',
  templateUrl: './helpcenter.component.html',
  styleUrls: ['./helpcenter.component.scss'],
  providers:[InstApi,EnterpriseApi,MemberApi]
})
export class HelpcenterComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
    public memberapi:MemberApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }
  onMyShow(){
    
  }
  content='';
  submit(){
    // var content=this.Base.getMyData().content;
    // var memberapi = new MemberApi();
    this.memberapi.addfankui({
      employee_id:this.operatorinfo.id,
      content: this.content,
      status:'A'
    }).then( (addfankui) => {

    })
  }

}