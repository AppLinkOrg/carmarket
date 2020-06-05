import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-waitsend',
  templateUrl: './waitsend.component.html',
  styleUrls: ['./waitsend.component.scss'],
  providers:[InstApi,EnterpriseApi]
})
export class WaitsendComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }
  daifahuo={};
  onMyShow(){
    this.orderApi.detail({
      id: this.params.id
    }).then( (daifahuo:any) => {
      this.daifahuo=daifahuo;
    })
  }

  bindquxiao(id) {
    var that =this;
    // var orderapi = new OrderApi();
    // wx.showModal({
    //   title: '取消订单',
    //   content: '确认取消订单？',
    //   showCancel: true,
    //   cancelText: '取消',
    //   cancelColor: '#EE2222',
    //   confirmText: '确定',
    //   confirmColor: '#2699EC',
    //   success: function (res) {
    //     if (res.confirm) {
          
          this.orderApi.updatestatus({
            id: id,
            order_status: "E"
          }).then( (updatestatus) => {
            // wx.navigateBack({
              that.back();
            // })
          })
    //     }
    //   }
    // })




  }


}
