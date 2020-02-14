import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent  extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }
  onMyShow(){
    
  }

}
