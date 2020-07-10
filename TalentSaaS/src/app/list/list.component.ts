import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[InstApi,MemberApi,EnterpriseApi]
})
export class ListComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public memberApi:MemberApi,
    public enterpriseApi:EnterpriseApi,
  ) {
    super(router,activeRoute,instApi,memberApi,enterpriseApi);
    
   }
  
   onMyLoad(){
     this.params;
   }
   onMyShow(){
     
   }
}
