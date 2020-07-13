import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-return-detail',
  templateUrl: './return-detail.component.html',
  styleUrls: ['./return-detail.component.scss'],
  providers: [InstApi, MemberApi, OrderApi]
})
export class ReturnDetailComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public enterpriseApi: EnterpriseApi,
    public orderApi: OrderApi,
  ) {
    super(router, activeRoute, instApi, memberApi, enterpriseApi);

  }

  onMyLoad() {
    this.params;
    this.type = this.params.type;
    this.prrmary_id = this.params.id;
  }
  type = '';
  prrmary_id = 0;
  returndetail = null;
  returnitem = [];
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("return", "return")
    }
    this.orderApi.returndetail({ id: this.prrmary_id }).then((returndetail: any) => {
      this.returndetail = returndetail;
      this.returnitem = returndetail.tuihuoitem.filter((item) => {
        if (returndetail.id == item.tuihuo_id) {
          return item
        }
      })
    })
  }
  fanhui() {
    this.navigate('/returncenter', { type: this.type });
  }
  saveQuote() {
    var item = this.returndetail;
    console.log(item);
    var that = this;
    if (item.orderstatus == 'R') {
      item.orderstatus = 'I';
      this.orderApi.updatereturnstatus({ id: item.id, orderstatus: item.orderstatus, order_id: item.order_id }).then((updatereturnstatus: any) => {
        this.type = 'I';
        this.fanhui();
      })
    } else if (item.orderstatus == 'I') {
      this.orderApi.addxiaofei({ type: "R", amount: item.return_money, enterprise_id: item.enterprise_id, employee_id: item.employee_id, order_id: item.order_id, returnemp_id: this.memberinfo.id }).then((addconsume) => {
        console.log(addconsume, 'aaaa')
        if (addconsume) {

          that.orderApi.updatemoney({ ent_id: item.enterprise_id, money: item.return_money, id: this.memberinfo.enterprise.id, mm_id: this.memberinfo.id }).then(() => {

          })

          that.orderApi.addxiaofei({ type: "R", amount: item.return_money, enterprise_id: this.memberinfo.enterprise_id, employee_id: this.memberinfo.id, order_id: item.order_id }).then(() => {

          })

          item.orderstatus = 'Y'
          that.orderApi.updatereturnstatus({ id: item.id, orderstatus: item.orderstatus, order_id: item.order_id }).then((updatereturnstatus: any) => {
            console.log(updatereturnstatus)

            that.type = 'Y';
            that.fanhui();

          })

        }
      })
    }
  }
}
