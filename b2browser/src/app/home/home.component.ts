import { Component, OnInit, ɵConsole } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [InstApi, EnterpriseApi, OrderApi]
})
export class HomeComponent extends AppBase {

  toggle = false;
  instinfo = null;
  public operatorinfo: any = {
    name: '',
    enterprise: {
      name: ''
    }
  }

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public enterpriseApi: EnterpriseApi,
    public OrderApi: OrderApi,
  ) {
    super(router, activeRoute, instApi, OrderApi, enterpriseApi);

    this.instinfo = {};
    this.instApi.info({ unicode: "carmarkets" }).then((instinfo) => {

      this.instinfo = instinfo;
    });
  }

  enterprise_id = ''
  employee_id = ''
  obj = null
  returnnum = '';
  ordernum = ''
  quotereadnum = ""
  risread = 'Y'
  oread = 'Y'
  isread = 'Y'
  onMyShow() {

    let oldtime = (new Date()).getTime() + 6*60*60*1000;
    window.localStorage.setItem('oldtime', oldtime.toString())

    this.activeRoute.queryParams.subscribe((aa) => {

      this.update(aa);
      this.getquot();
      setInterval(() => {

        this.update(aa);
        this.getquot();

      }, 2000);



    })


  }


  toggleSidebar() {
    console.log('jjjjjj')
    this.toggle = !this.toggle;
  }

  update(aa) {

    var that = this;

    this.enterpriseApi.employeeinfo({}).then((employeeinfo: any) => {
      

      if (employeeinfo.enterprise_id == "0") {
        this.router.navigate(["login"]);
        return
      }
      this.employee_id = employeeinfo.id;
      this.enterprise_id = employeeinfo.enterprise_id
      
      var a = this.orderapi;
      var arrs = [];


      this.orderapi.orderisread({ enterprise_id: this.enterprise_id, employee_id: this.employee_id }).then((ret: any) => {
        // console.log(ret, '订单')
        if (ret) {
          if (ret.quote > '0') {
            this.isread = 'N';
            this.quotereadnum = ret.quote;
            // this.quotereadnum = '加载中';
          } else {
            this.isread = 'Y';
          }

          if (ret.order > '0') {
            this.oread = 'N';
            this.ordernum = ret.order;
            // this.ordernum =  '加载中';
          } else {
            this.oread = 'Y';
          }

          if (ret.return > '0') {
            this.risread = 'N';
            this.returnnum = ret.return;
            // this.returnnum = '加载中';
          } else {
            this.risread = 'Y';
          }

        }
      })

 
    })

    if (aa.result == 'yes') {
      this.enterpriseApi.employeeinfo({}).then((employeeinfo: any) => {
 
        if (employeeinfo.enterprise_id == "0") {
          this.router.navigate(["login"]);
          return
        }

        this.enterprise_id = employeeinfo.enterprise_id
        this.employee_id = employeeinfo.id

        this.obj = employeeinfo
 
        var a = this.orderapi
        var a = this.orderapi
        var arrs = [];
      

        this.orderapi.orderisread({ enterprise_id: this.enterprise_id, employee_id: this.employee_id }).then((ret: any) => {
          // console.log(ret, '订单')
          if (ret) {
            if (ret.quote > '0') {
              this.isread = 'N';
              this.quotereadnum = ret.quote;
            } else {
              this.isread = 'Y';
            }

            if (ret.order > '0') {
              this.oread = 'N';
              this.ordernum = ret.order;
            } else {
              this.oread = 'Y';
            }

            if (ret.return > '0') {
              this.risread = 'N';
              this.returnnum = ret.return;
            } else {
              this.risread = 'Y';
            }

          }
        })
 

      })
    }
  }
  list = [];
  getquot() {
    this.list = [];
    var a = this.orderapi;
    a.addquotation({}).then((list: any) => {
   
    })
  }
  ignore = [];
  getigro() {
    this.ignore = [];
    var a = this.orderapi;
    a.ignore({ quoteemployee_id: this.employee_id, quoteenterprise_id: this.enterprise_id }).then((ignore: any) => {
      this.ignore = ignore;
      console.log(ignore)
      if (this.ignore.length == ignore.length) {
        console.log("bbbbbbbb")
        this.getquotion();
      }

    })
  }
  quotion = [];
  getquotion() {
    this.quotion = [];
    var a = this.orderapi;
    a.quotationlist({ quotecompan_id: this.enterprise_id }).then((quotationlist: any) => {
      this.quotion = quotationlist;
      console.log("cccccccc");
      console.log(quotationlist)
      if (this.quotion.length == quotationlist.length) {
        this.saoxuan();
      }

    })
  }

  saoxuan() {
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].quotestatus == 'Q' || this.list[i].quotestatus == 'W') {

        if (this.notinignore(this.list[i], this.ignore)) {
        
          if (this.notinignore4(this.list[i], this.quotion)) {
           
            this.list[i].quote_id = this.list[i].id;
            this.list[i].quoteper = this.employee_id;
            this.list[i].quotecompan_id = this.enterprise_id;
            this.list[i].quotestatus = "Q";
            this.list[i].pinzhi = this.list[i].pinzhi;
            this.list[i].photo1 = this.list[i].photo1;
            if (this.list[i].invoice_demand != "") {
              this.list[i].invoice_demand = this.list[i].invoice_demand;
            } else if (this.list[i].invoice_demand == "" && this.list[i].invoice_demand_value != "") {
              this.list[i].invoice_demand = this.list[i].invoice_demand_value;
            }
            delete this.list[i].id;


            this.addquote(i, this.list[i]);



          }

        }


      }

    }

  }

  addquote(i, json) {
    var a = this.orderapi;
    setTimeout(() => {
      a.addquotation(json).then((addquotation: any) => {
        console.log(addquotation, 'addquotation');
      })
    }, i * 600);

  }

  notinignore4(item, arr) {
    for (let yiitem of arr) {
        if(yiitem.quote_id==item.id && yiitem.quotestatus=='W'){
          return false
        }
      if (yiitem.quote_id =='0') {
        return false
      }

    }
    return true
  }

  notinignore(item, ignore) {
    for (let igitem of ignore) {
      if (item.id == igitem.quote_id) {
        return false;
      }
    }
    return true;
  }

}
