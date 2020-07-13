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
  selector: 'app-quote-price',
  templateUrl: './quote-price.component.html',
  styleUrls: ['./quote-price.component.scss'],
  providers: [InstApi, MemberApi,OrderApi]
})
export class QuotePriceComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public enterpriseApi: EnterpriseApi,
    public orderApi: OrderApi,
  ) {
    super(router, activeRoute, instApi, memberApi,enterpriseApi);

  }

  onMyLoad() {
    this.params;
  }
  quoteinfo=null;
  list=[];
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("quote", "quote");
    }
    this.orderApi.quoteinfo({ id:  this.params.quote_id }).then((quoteinfo: any) => {
      for (let item of quoteinfo.fittingsitem) {
        if (item.quoteitems.length != 0) {
          for (let list of item.quoteitems) {
            if (list.enterprise_id == this.memberinfo.enterprise.id) { 
              this.list.push(list)
            }
          }
        }

      }
      this.quoteinfo = quoteinfo;
    })
  }
  fanhui() {
    this.navigate('quotecenter',{type:this.params.type});
  }
}
