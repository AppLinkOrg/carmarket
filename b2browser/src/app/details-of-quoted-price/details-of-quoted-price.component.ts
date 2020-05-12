import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';


@Component({
  selector: 'app-details-of-quoted-price',
  templateUrl: './details-of-quoted-price.component.html',
  styleUrls: ['./details-of-quoted-price.component.scss'],
  providers: [InstApi, OrderApi, EnterpriseApi]
})
export class DetailsOfQuotedPriceComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public orderApi: OrderApi,
    public enterpriseApi: EnterpriseApi,
  ) {
    super(router, activeRoute, instApi, orderApi, enterpriseApi);
  }


  quoteinfo = {};
  id = '';
  list = [];

  employee_id = ''
  employee_id_name = ''
  enterprise_id_name = ''
  enterprise_id = ''

  perInfo = []
  quote_id = ''
  invalid = ''

  onMyShow() {
    let oldtime = (new Date()).getTime() + 6 * 60 * 60 * 1000;
    window.localStorage.setItem('oldtime', oldtime.toString())
    this.activeRoute.queryParams.subscribe(queryParams => {
      console.log(queryParams)
      // this.id = queryParams.id
      this.quote_id = queryParams.quote_id

      var a = this.orderApi

      this.enterpriseApi.employeeinfo({}).then((employeeinfo: any) => {
        console.log(employeeinfo)
        this.enterprise_id = employeeinfo.enterprise_id
        this.employee_id = employeeinfo.id
        this.employee_id_name = employeeinfo.name
        this.enterprise_id_name = employeeinfo.enterprise.name

        this.orderApi.yiquotelist({ quote_id: this.quote_id, quoteenterprise_id: this.enterprise_id }).then((yiquotelist: any) => {
          console.log(yiquotelist, 'yiyyyiyiyi')

          for (let item of yiquotelist) {
            this.id = item.id
          }

          a.yiquoteinfo({ id: this.id, quote_id: this.quote_id }).then((quoteinfo: any) => {


            this.quoteinfo = quoteinfo;
            console.log(this.quoteinfo, 'jjjjj')
            this.invalid = quoteinfo.invalid_value

            for (let item of quoteinfo.fittingsitem) {
              if (item.quoteitems.length != 0) {
                console.log('llll')

                for (let list of item.quoteitems) {
                  console.log('aaaa');
                  if (list.enterprise_id == this.enterprise_id) { 
                    this.list.push(list)
                  }

                  // this.employee_id = list.employee_id
                  // this.enterprise_id_name = list.edt_name
                  // this.enterprise_id = list.enterprise_id
                }
              }

            }
            console.log(this.list, '看看这个列表')
          })


        })


      })


    })



    this.enterpriseApi.allenterprise({ id: this.employee_id, enterprise_id: this.enterprise_id }).then((info: any) => {
      console.log(info, 'info')
      for (let i = 0; i < info.length; i++) {
        if (info[i].id == this.employee_id && info[i].enterprise_id == this.enterprise_id) {
          this.employee_id_name = info[i].name
          this.perInfo.push(info[i])
        }
      }
    })


    console.log(this.perInfo, 'perInfo')
    console.log(this.list)
    console.log(this.employee_id, this.employee_id_name, this.enterprise_id_name)


  }
  fanhui() {
    this.navigate('quotationCenter', { aa: this.params.aa })
  }
}
