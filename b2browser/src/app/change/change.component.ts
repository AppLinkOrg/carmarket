import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss'],
  providers:[InstApi,EnterpriseApi]
})
export class ChangeComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }
  change="A";
  returnlist=[];
  yituihuan=[];
  onMyShow(){
    this.orderApi.returnlist({
      orderstatus:'R,I'
      }).then( (returnlist:any) => {
        this.returnlist=returnlist;
      })
  
      this.orderApi.returnlist({ 
        orderstatus: 'Y'
      }).then((yituihuan:any) => {
        this.yituihuan=yituihuan;
      })
  }

  bindtui(id) {
    // var id = e.currentTarget.id;
    // wx.navigateTo({
    //   url: '/pages/changedetail/changedetail?id=' + id,
    // })
    this.navigate('/changedetail',{id:id})
   
  }

  bindchange(e) {
    // var changeid = e.currentTarget.dataset.change;
    // this.Base.setMyData({
    //   change: changeid
    // });
    this.change=e;
  }

}