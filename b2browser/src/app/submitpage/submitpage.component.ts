import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
import { CarApi } from 'src/providers/car.api';

@Component({
  selector: 'app-submitpage',
  templateUrl: './submitpage.component.html',
  styleUrls: ['./submitpage.component.scss'],
  providers: [CarApi]
})
export class SubmitpageComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public enterpriseApi: EnterpriseApi,
    public orderApi: OrderApi,
    public carApi: CarApi
  ) {
    super(router, activeRoute, instApi, orderApi, enterpriseApi);
  }
  list=[];
  onMyLoad() {
     var las=this.params.ss;

     this.list=JSON.parse(las);

     console.log(this.list,'闯入的')
  }
  onMyShow() {

     
  }
  

}
