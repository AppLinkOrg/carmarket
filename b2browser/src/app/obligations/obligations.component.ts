import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-obligations',
  templateUrl: './obligations.component.html',
  styleUrls: ['./obligations.component.scss'],
  providers:[InstApi,EnterpriseApi]
})
export class ObligationsComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }
  detail={};
  detail2=null;
  onMyShow(){
    this.orderApi.detail({
      order_status: 'W',
      id: this.params.id
    }).then((detail:any) => {
      this.detail=detail;
      this.detail2=detail;
    })
  }
  bindbuy(price) {
    var that = this;
    // var orderapi = new OrderApi();
    // var price = e.currentTarget.id;/
    var detail = this.detail2;
    var enmoney = this.operatorinfo.enterprise.account_money;
    console.log(detail.totalamount, 'price', enmoney)
    console.log(detail.totalamount>enmoney)
    // wx.showModal({
    //   title: '购买',
    //   content: '确认购买？',
    //   showCancel: true,
    //   cancelText: '取消',
    //   cancelColor: '#EE2222',
    //   confirmText: '确定',
    //   confirmColor: '#2699EC',
    //   success: function(res) {
    //     if (res.confirm) {

          if (Number(detail.totalamount) > Number(enmoney)) {
            // wx.showToast({
            //   title: '余额不足，请及时充值！',
            //   icon: 'none'
            // })
            alert('余额不足，请及时充值！');
            return;
          }

          this.orderApi.updatemoney({
            id: that.operatorinfo.enterprise_id,
            money: detail.totalamount,
            em_id: detail.employee_id
          }).then( (updatemoney) => {

            this.orderApi.updatestatus({
              id: this.params.id,
              order_status: "L",
              quote_id: detail.quote_id
            }).then( (updatestatus) => {

            })

            var list = {
              enterprise_id: that.operatorinfo.enterprise_id,
              employee_id: that.operatorinfo.id,
              amount: detail.totalamount,
              type: 'G',
              order_id: detail.id,
              enterprise_id2: detail.enterprise_id,
              employee_id2: detail.employee_id,
              type2: 'S'
            }

            this.orderApi.addconsume(list).then( (addconsume) => {

             that.back();

            })
   
          })
    //     }
    //   }
    // })





  }
}
