import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-waitreceive',
  templateUrl: './waitreceive.component.html',
  styleUrls: ['./waitreceive.component.scss'],
  providers:[InstApi,EnterpriseApi]
})
export class WaitreceiveComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }
  daishouhuo={};
  onMyShow(){
    this.orderApi.detail({
      id: this.params.id
    }).then( (daishouhuo:any) => {
      this.daishouhuo=daishouhuo
    })
  }

  bindshou(id){
    // var id = e.currentTarget.id
    // var orderapi = new OrderApi();
var that = this;

    // wx.showModal({
    //   title: '收货',
    //   content: '确认货物已收到？',
    //   showCancel: true,
    //   cancelText: '取消',
    //   cancelColor: '#EE2222',
    //   confirmText: '确定',
    //   confirmColor: '#2699EC',
    //   success: function (res) {
        // if (res.confirm) {
          this.orderApi.updatestatus({
            id: id,
            order_status: "N"
          }).then((updatestatus) => {
            // wx.navigateBack({

            // })
            that.back();
          })
    //     }
    //   }
    // })




  }

  


}

