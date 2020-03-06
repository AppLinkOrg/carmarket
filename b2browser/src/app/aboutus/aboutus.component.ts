import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
    providers:[InstApi,EnterpriseApi,MemberApi]
})
export class AboutusComponent extends AppBase  {

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
  aboutus={};
  onMyShow(){
    this.memberapi.aboutus({id:1}).then( (aboutus:any) => {
      console.log(aboutus,'aboutus')
      this.aboutus=aboutus;
    });
  }

}
