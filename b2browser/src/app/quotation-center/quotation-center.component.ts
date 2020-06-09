import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';

@Component({
  selector: 'app-quotation-center',
  templateUrl: './quotation-center.component.html',
  styleUrls: ['./quotation-center.component.scss'],
  providers: [InstApi, OrderApi, EnterpriseApi]
})
export class QuotationCenterComponent extends AppBase {

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
  list2 = [];
  ignore = null;

  length = null;

  pageSize = 5;
  pages = 1;
  newPage = null;
  pageList = [];
  selPage = 1;
  data = null;
  setData = null;

  isquote = true;
  isshow = true

  distinctlist = null;

  enterprise_id = '';
  enterprise_id_name = '';
  employee_id = '';
  employee_id_name = '';
  aa = 1;
  distinct = []
  daibaolen = 0;
  yibaolen = 0;
  yihulen = 0;
  yishilen = 0;
  alllen = 0;
  check = "Q";
  photoshow = false;
  imgs = [];
  exp = true;
  onMyLoad() {
    this.params;

    if (this.params.aa != undefined) {
      this.aa = this.params.aa;
    }

  }
  ngOnDestroy(){
    // alert('看看')
    clearInterval(AppBase.interval);
  }
  onMyShow() {

    let oldtime = (new Date()).getTime() + 6 * 60 * 60 * 1000;
    window.localStorage.setItem('oldtime', oldtime.toString())
    var a = this.orderApi;

    this.enterpriseApi.employeeinfo({}).then((employeeinfo: any) => {

      this.enterprise_id = employeeinfo.enterprise_id
      this.employee_id = employeeinfo.id
      this.employee_id_name = employeeinfo.name
      this.enterprise_id_name = employeeinfo.enterprise.name


      a.distinctlist({}).then((distinctlist: any) => {
        this.distinctlist = distinctlist
      })


      this.quoteHandle("Q");
      this.comlen();

 
      console.log(AppBase.interval,'定时器');

   
        AppBase.interval=setInterval(() => { 
          this.quoteHandle(this.check);
          this.comlen(); 
          console.log('定时器33');
        }, 3000);
      


      console.log(AppBase.interval,'定时器22');


    })



  }

   

  change(type) {
    this.check = type;
    // this.comlen();

    this.quoteHandle(type);

  }

  compare(pro) {
    return function (a, b) {
      return b[pro] - a[pro]
    }
  }

  notinignore4(item, arr) {
    for (let yiitem of arr) {
      if (yiitem.quote_id == item.id) {
        if (yiitem.quotecompan_id == this.enterprise_id && yiitem.quoteper == this.employee_id) {
          return false
        }
      }
    }
    return true;
  }

  notinignore(item, ignore) {
    for (let igitem of ignore) {
      if (item.id == igitem.quote_id) {
        return false;
      }
    }
    return true;
  }

  notinignore2(item, ignore) {
    for (let igitem of ignore) {
      if (item.quote_id == igitem.quote_id) {
        return false;
      }
    }
    return true;
  }

  choose(e) {

    // this.distinct = []

    console.log(e)

    var current = e.target
    // current.classList.add('disname-active')
    console.log(current.innerText)

    console.log(this.hasClass(current, 'disname-active'))
    if (current.innerText == "全部") {
      this.distinct = []

      var others = current.parentElement.childNodes
      console.log(others, '444')
      for (let i = 0; i < others.length; i++) {
        if (current != others[i] && this.hasClass(others[i], 'disname-active')) {
          others[i].classList.remove('disname-active')
        }
        current.classList.add('disname-active')
      }

      if (this.hasClass(current, 'disname-active')) {

        this.distinct.push(current.innerText)
      }


    } else {

      for (let i = 0; i < this.distinct.length; i++) {
        if (this.distinct[i] == "全部") {
          this.distinct.splice(i, 1)
        }
      }


      var others = current.parentElement.childNodes
      for (let i = 0; i < others.length; i++) {
        if (others[i].innerText == "全部") {
          others[i].classList.remove('disname-active')
        }
      }

      if (this.hasClass(current, 'disname-active')) {
        current.classList.remove('disname-active')
      } else {
        current.classList.add('disname-active')
      }

      if (this.hasClass(current, 'disname-active')) {

        this.distinct.push(current)
      }

    }

  }

  hasClass(obj, cls) {
    var cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) {
      return false;//当cls没有参数时,返回false;
    } else {
      return new RegExp(' ' + cls + '').test(' ' + obj.className);
    }
  }

  reset(e) {
    this.distinct = []
    console.log(e)
    var others = e.target.parentElement.parentElement.parentElement.parentElement.childNodes[1].childNodes
    console.log(others)
    if (this.hasClass(others[1], 'disname-active')) {

    } else {
      others[1].classList.add('disname-active')
    }

    others[0].classList.remove('disname-active')
    for (let i = 2; i < others.length; i++) {
      if (this.hasClass(others[i], 'disname-active')) {
        others[i].classList.remove('disname-active')
      }
    }
    this.distinct = ['全部']
  }

  save() {
    this.pageList = []

    console.log(this.distinct)
    console.log(this.list, '555555')
    let temp = []
    for (let i = 0; i < this.list.length; i++) {
      for (let j = 0; j < this.distinct.length; j++) {

        if (this.distinct[j] == "全部") {

          temp.push(this.list[i])

        } else {

          if (this.hasClass(this.distinct[j], 'disname-active')) {
            console.log(this.distinct[j].innerText)

            if (this.list[i].enterprise_corporate_address.indexOf(this.distinct[j].innerText) != -1) {
              // console.log(this.distinct[j])
              temp.push(this.list[i])
              console.log('kkkkk')

            } else {
              console.log(false)
            }

          }



        }

      }
    }

    console.log(temp, '6666')

    this.length = temp.length

    this.pagination()
    console.log(temp)

  }


  showPhoto(item) {
    console.log(item)
    this.imgs = []
    this.photoshow = true
    console.log(item)

    this.imgs.push(item)
    var arr = []
    this.imgs = this.imgs.filter((item, index) => {

      console.log(item.photo1, 'lllll')
      if (item.photo1.indexOf(',') > -1) {
        arr = item.photo1.split(',')
      } else {
        arr.push(item.photo1)
      }

      console.log(arr, '急急急')

      item.arr = arr

      if (item.frontofcar == "" && item.namesplate != "") {
        item.frontofcar = item.namesplate
        item.namesplate = ""
      }
      if (item.frontofcar == "" && item.namesplate == "" && item.rearofcar != "") {
        item.frontofcar = item.rearofcar
        item.rearofcar = ""
      }
      if (item.frontofcar == "" && item.namesplate == "" && item.rearofcar == "" && item.photo1 != "") {

        item.frontofcar = item.photo1
        item.photo1 = ""
      }

      return item
    })
    // var iamg =  this.imgs.concat(arr)
    console.log(this.imgs, 'llll')

  }

  ignoreHandle(item) {
    this.list = [];
    console.log(item, '已忽略')
    this.pageList = [];
    // item.quote_id = item.id
    item.ignorestatus = 'Y'
    item.quoteemployee_id = this.employee_id
    item.quoteenterprise_id = this.enterprise_id
    console.log(item)
    this.orderApi.editisread({ quote_id: item.id, enterprise_id: this.enterprise_id, employee_id: this.employee_id }).then((ret) => {
      console.log(ret, '改改了')
      if (ret) {
        this.orderApi.addignore({ id: item.id }).then((searchignore: any) => {

          this.change(3);
          this.yihulen++;


        })
      }
    })



  }

  screening() {

  }

  comlen() {

    var daibaolen = 0;
    var yibaolen = 0;
    var yihulen = 0;
    var yishilen = 0;
    //var alllen = 0;
    var orderapi = this.orderApi;

    orderapi.quotationlist({}).then((ignore: any) => {
      var arr = [];
      for (let item of ignore) {

        if (item.quotestatus == 'Q' && item.quoteper == this.employee_id) {
          daibaolen++
        }
        if (item.quotestatus == 'H' && item.quoteper == this.employee_id) {
          yihulen++
        }
        if (item.quotestatus == 'W') {
          yibaolen++
        }
        if (item.quotestatus == 'S') {
          yishilen++
        }

        if (item.quoteper == this.employee_id) {
          arr.push(item);
        } else {
          if (item.quotestatus == 'W' || item.quotestatus == 'S') {
            arr.push(item);
          }
        }

      }

      this.daibaolen = daibaolen;
      this.yihulen = yihulen;
      this.yibaolen = yibaolen;
      this.yishilen = yishilen;
      this.alllen = arr.length;
    })

  }

  // 待报价 quoteHandle
  quoteHandle(type) {

    console.log(type, '选中的列表')
    //return;

    //dbj this.isquote = true; 
    //ysx this.exp = false;
    //qb  this.isshow = true;

    var type = type;

    this.list = [];
    
    // this.pageList = this.pageList;

    // this.isshow = false;
    // this.exp = true;
    this.isshow = type == 'A' ? true : false;
    this.isquote = type == 'Q' ? true : false;
    this.exp = type == 'S' ? false : true;
 
    //return;

    var orderapi = this.orderApi;

    if (type == 'H') {
      var quoteper = this.employee_id;
    } else {
      var quoteper = '';
    }

    if (type == 'A') {
      type = "";
    }

    orderapi.quotationlist({ quoteenterprise_id: this.enterprise_id, quotestatus: type, quoteper: quoteper }).then((list: any) => {
      this.list = list;
      console.log(this.list)

      this.length = list.length;

      for (let i = 0; i < this.list.length; i++) {

        if (list[i].quotestatus == 'Q') {
          list[i].quotestatus_name = '待报价';
        } else if (list[i].quotestatus == 'W') {
          list[i].quotestatus_name = '已报价';
        } else if (list[i].quotestatus == 'H') {
          list[i].quotestatus_name = '已忽略';
        } else if (list[i].quotestatus == 'S') {
          list[i].quotestatus_name = '已失效';
        }

        this.list[i].index = i
      }

      this.pagination();
    })

     

  }

 

  panduan(item, yiquote) {
    for (let yiitem of yiquote) {
      if (item.quote_id == yiitem.quote_id) {
        console.log('1111')
        return yiitem
      } else {
        console.log('222')
        return item
      }
    }

  }


  tiaozhuan(itemId, quote_id) {
    this.orderApi.editisread({ quote_id: itemId, enterprise_id: this.enterprise_id, employee_id: this.employee_id }).then((ret) => {
      console.log(ret, '改改了')
      if (ret) {
        this.router.navigate(['quotationDetails'], {
          queryParams: {
            id: itemId,
            quote_id: quote_id,
            employee_id: this.employee_id,
            employee_id_name: this.employee_id_name,
            enterprise_id_name: this.enterprise_id_name,
            aa: this.aa
          }
        })
      }
    })

  }

  tiaozhuan2(itemId) {
    var that = this;
    this.orderApi.editisread({ quote_id: itemId, enterprise_id: this.enterprise_id, employee_id: this.employee_id }).then((ret) => {
      console.log(ret, '改改了')
      if (ret) {
        this.router.navigate(['detailsOfQuotedPrice'], {
          queryParams: {
            quote_id: itemId,
            aa: that.aa
          }
        })
      }
    })

  }

  pagination( ) {

    var pagelist=[];
    this.selPage=this.selPage;
  
    this.pages = Math.ceil(this.length / this.pageSize);
    console.log(this.pages,'页数')

    this.newPage = this.pages > 5 ? 5 : this.pages;
   // this.selPage = 1;

    console.log(this.newPage,'新')

    this.setData = function () {
      this.data = this.list.slice(this.pageSize * (this.selPage - 1), this.pageSize * this.selPage); 
    }

    this.data = this.list.slice(0, this.pageSize);
     

    for (var i = 0; i < this.newPage; i++) {
      pagelist.push(i + 1);
    }

    this.pageList=pagelist;
    
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
  }

  Next() {
    this.selectPage(this.selPage + 1);
  }

  fristPage() {
    this.selectPage(this.selPage = 1)
  }

  lastPage() {
    this.selectPage(this.selPage = this.pages)
  }

}





