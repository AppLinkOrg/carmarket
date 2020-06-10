import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss'],
  providers: [InstApi, OrderApi, EnterpriseApi]
})
export class OrderManagementComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public orderApi: OrderApi,
    public enterpriseApi: EnterpriseApi,
  ) {
    super(router, activeRoute, instApi, orderApi, enterpriseApi);
  }



  list = [];
  operation = 'A'
  isshow = true;

  length = null;

  pageSize = 10;
  pages = null;
  newPage = null;
  pageList = [];
  selPage = 1;
  data = [];
  setData = null;

  getstatus = null;
  order_time_dateformat = null
  month_time = null

  enterprise_id = ''
  employee_id = ''
  em_id = ""
  emm_id = '';
  cc = '';

  alllen = 0;
  falen = 0;
  shoulen = 0;
  wanlen = 0;
  qulen = 0;
  fulen = 0;
  mylist = [];
  type = "A";
  onMyLoad() {
    this.params;
    if (this.params.aa != undefined) {
      this.bb = this.params.aa;
    }
    // this.change(this.bb);
  }
  ngOnDestroy() {
    // alert('看看')
    clearInterval(AppBase.interval);
  }
  onMyShow() {
    let oldtime = (new Date()).getTime() + 6 * 60 * 60 * 1000;
    window.localStorage.setItem('oldtime', oldtime.toString())
    var orderapi = this.orderApi;

    this.enterpriseApi.employeeinfo({}).then((employeeinfo: any) => {

      this.enterprise_id = employeeinfo.enterprise_id
      this.em_id = employeeinfo.id

      if (employeeinfo.position == 'B' || employeeinfo.power == 'Y') {
        this.employee_id = '';
      } else {
        this.employee_id = employeeinfo.id;
      }

      this.comlen();
      this.selectmylist();

      if (AppBase.interval != null) {
        clearInterval(AppBase.interval);
      }

      AppBase.interval = setInterval(() => {
        this.selectmylist();
        this.comlen();
      }, 3000);


      // console.log(this.enterprise_id, '---', this.employee_id);

      // orderapi.mylist({ enterprise_id: this.enterprise_id, baojia: this.employee_id }).then((mylist: any) => {

      //   this.list = []
      //   this.pageList = []

      // })

    })

  }

  comlen() {

    var alllen = 0;
    var falen = 0;
    var shoulen = 0;
    var wanlen = 0;
    var qulen = 0;
    var fulen = 0;

    var orderapi = this.orderApi;

    orderapi.mylist({ enterprise_id: this.enterprise_id, baojia: this.employee_id }).then((mylist: any) => {
      var arr = [];
      for (let item of mylist) {
        alllen++
        if (item.order_status == 'L') {
          falen++
        }
        if (item.order_status == 'M') {
          shoulen++
        }
        if (item.order_status == 'N') {
          wanlen++
        }
        if (item.order_status == 'E') {
          qulen++
        }
        if (item.order_status == 'W') {
          fulen++
        }

      }
      this.alllen = alllen;
      this.falen = falen;
      this.shoulen = shoulen;
      this.wanlen = wanlen;
      this.qulen = qulen;
      this.fulen = fulen;
    })

  }


  bb = 1
  change(type) {

    this.type = type;

    this.selectmylist();

  }



  // 全部
  allGoos() {

    this.pageList = []
    this.length = null
    this.operation = 'A'
    this.isshow = true
    this.getstatus = null;
    this.order_time_dateformat = null
    this.month_time = null

    this.list = this.list
    this.length = this.list.length
    // this.pagination(this.list, this.length)

  }

  //查询关于我的订单列表
  selectmylist() {
    this.isshow = false
    var orderapi = this.orderApi;
    if (this.type == 'A') {
      this.type = "";
    }

    orderapi.mylist({ enterprise_id: this.enterprise_id, baojia: this.employee_id, order_status: this.type }).then((mylist: any) => {
      this.list = mylist;

      console.log(this.list, '看看这个订单列表')
      if (mylist != null) {

        for (let i = 0; i < mylist.length; i++) {
          mylist[i].index = i;
        }
        this.length = mylist.length

        console.log(this.length, '数组长度')

        this.pagination()

      }

    })

  }





  tiaozhuan(item) {
    console.log(item)
    // if(this.em_id==item.employee_id){
    this.orderApi.editisread({ order_id: item.id, enterprise_id: this.enterprise_id, employee_id: this.em_id }).then((ret) => {
      console.log(ret, '改改了')
      if (ret) {
        this.router.navigate(['sendGoodsDetail'], {
          queryParams: {
            id: item.id,
            aa: this.bb
          }
        })
      }
    })
    // }





  }

  tiaozhuan2(item) {
    console.log(item)
    // if(this.em_id==item.employee_id){
    this.orderApi.editisread({ order_id: item.id, enterprise_id: this.enterprise_id, employee_id: this.em_id }).then((ret) => {
      console.log(ret, '改改了')
      if (ret) {
        this.router.navigate(['receiveGoodsDetail'], {
          queryParams: {
            id: item.id,
            aa: this.bb
          }
        })
      }
    })
    // }

  }

  tiaozhuan3(item) {
    console.log(item)
    // if(this.em_id==item.employee_id){
    this.orderApi.editisread({ order_id: item.id, enterprise_id: this.enterprise_id, employee_id: this.em_id }).then((ret) => {
      console.log(ret, '改改了')
      if (ret) {
        this.router.navigate(['finishDetail'], {
          queryParams: {
            id: item.id,
            aa: this.bb
          }
        })
      }
    })
    // }
  }

  tiaozhuan4(item) {
    // if(this.em_id==item.employee_id){
    this.orderApi.editisread({ order_id: item.id, enterprise_id: this.enterprise_id, employee_id: this.em_id }).then((ret) => {
      console.log(ret, '改改了')
      if (ret) {
        this.router.navigate(['cancelDetail'], {
          queryParams: {
            id: item.id,
            aa: this.bb
          }
        })
      }
    })
    // }
  }

  tiaozhuan5(item) {
    // if(this.em_id==item.employee_id){
    this.orderApi.editisread({ order_id: item.id, enterprise_id: this.enterprise_id, employee_id: this.em_id }).then((ret) => {
      console.log(ret, '改改了')
      if (ret) {
        this.router.navigate(['waiting'], {
          queryParams: {
            id: item.id,
            aa: this.bb
          }
        })
      }
    })
    // }


  }


  detailStatus(item) {
    console.log(item, this.em_id)
    // if(this.em_id==item.employee_id){
    if (item.order_status_name == '待发货') {

      this.tiaozhuan(item);

    } else if (item.order_status_name == '待收货') {

      this.tiaozhuan2(item)

    } else if (item.order_status_name == '已完成') {

      this.tiaozhuan3(item)

    } else if (item.order_status_name == '已取消') {

      this.tiaozhuan4(item);

    } else if (item.order_status_name == '待付款') {

      this.tiaozhuan5(item);

    }
    // }



  }



  // pagination( ) {
  //   // this.pageSize = 10;

  //   this.pages = Math.ceil(this.length / this.pageSize)
  //   this.newPage = this.pages > 10 ? 10 : this.pages;
  //   this.selPage = 1;

  //   this.setData = function () {
  //     this.data = this.list.slice(this.pageSize * (this.selPage - 1), this.pageSize * this.selPage);
  //   }
  //   this.data = this.list.slice(0, this.pageSize);

  //   for (var i = 0; i < this.newPage; i++) {
  //     this.pageList.push(i + 1);
  //   }

  // }


  pagination() {
    // this.pageSize = 10;
    var pagelist = [];
    this.selPage = this.selPage;
    this.pages = Math.ceil(this.length / this.pageSize);
    this.newPage = this.pages > 5 ? 5 : this.pages;
    this.setData = function () {
      this.data = this.list.slice(this.pageSize * (this.selPage - 1), this.pageSize * this.selPage);
    }
    this.data = this.list.slice(0, this.pageSize);
    for (var i = 0; i < this.newPage; i++) {
      pagelist.push(i + 1);
    }
    this.pageList = pagelist;
    this.selectPage(this.selPage);
  }

  selectPage(page) {
    if (page < 1 || page > this.pages) return;

    if (page > 2) {
      var newpageList = [];
      for (var i = (page - 3); i < ((page + 2) > this.pages ? this.pages : (page + 2)); i++) {
        newpageList.push(i + 1);
      }
      this.pageList = newpageList;
    }
    this.selPage = page;
    this.setData();
    this.isActivePage(page);
  }



  isActivePage(page) {
    return this.selPage == page;
  }


  Previous() {
    this.selectPage(this.selPage - 1);
  };

  Next() {
    this.selectPage(this.selPage + 1);
  };

  fristPage() {
    this.selectPage(this.selPage = 1)
  }

  lastPage() {
    this.selectPage(this.selPage = this.pages)
  }


}