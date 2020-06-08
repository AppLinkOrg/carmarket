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

  pageSize = null;
  pages = null;
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
  photoshow = false;
  imgs = [];
  exp = true;
  onMyLoad() {
    this.params;
    
    if (this.params.aa != undefined) {
      this.aa = this.params.aa;
    }

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

      if (this.aa == 1) {
        this.quoteHandle();
        this.comlen();
      }else{
        this.change(this.aa);
      }

      setInterval(() => {
        if (this.aa == 1) {
          this.quoteHandle();
          this.comlen();
        }else{
          this.change(this.aa); 
        }
      }, 3000);

    })



  }

  change(e) {
    this.aa = e;
    // this.comlen();
    if (e == 1) {
      this.quoteHandle();
    } else if (e == 2) {
      this.neglected("W");
    } else if (e == 3) {
      this.neglected("H");
    } else if (e == 4) {
      this.neglected("S");
    } else if (e == 5) {
      this.allQuote()
    }
    
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

    this.pagination(temp, this.length)
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
        this.orderApi.addignore({id:item.id}).then((searchignore: any) => {

            this.change(3);
            this.yihulen++;

          
        })
      }
    })



  }

  screening() {

  }
  
  comlen() {
    
    this.daibaolen = 0;
    this.yibaolen = 0;
    this.yihulen = 0;
    this.yishilen = 0;
    this.alllen = 0;
    var orderapi = this.orderApi; 
    // quoteper:this.employee_id
    orderapi.quotationlist({ }).then((ignore: any) => {
      var arr=[];
      for(let item of ignore){

        if(item.quotestatus=='Q'&&item.quoteper==this.employee_id){
          this.daibaolen++
        }
        if(item.quotestatus=='H'&&item.quoteper==this.employee_id){
          this.yihulen++
        }
        if(item.quotestatus=='W'){
          this.yibaolen++
        }
        if(item.quotestatus=='S'){
          this.yishilen++
        }
        
        if(item.quoteper==this.employee_id){
          arr.push(item);
        }else {
          if(item.quotestatus=='W' || item.quotestatus=='S'){
            arr.push(item);
          }
        }

      }

      // this.daibaolen=this.daibaolen;
      // this.yihulen=this.yihulen;
      // this.yibaolen=this.yibaolen;
      // this.yishilen=this.yishilen;
      this.alllen=arr.length;
    })

  }

  // 待报价
  quoteHandle() {
    this.list = [];
    this.pageList = [];
    this.isquote = true;
    this.isshow = false;
    this.exp = true;
    
    var a = this.orderApi;
    a.quotationlist({quoteper:this.employee_id,quotestatus:'Q'}).then((list:any)=>{
      console.log(list,'lililili')
      this.list=list;
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].index = i
      }
      this.pagination(list,list.length);
    })
  
  }
 
  // 已忽略
  neglected(type) {
    this.list = [];
    this.pageList = [];
    this.isshow = false
    this.isquote = false;
    this.exp = true;
   
    var type=type;
    if(type=='H'){
      var quoteper=this.employee_id;
    }else {
      var quoteper='';
    }
    this.orderApi.quotationlist({ quotestatus:type ,quoteper:quoteper}).then((ignore: any) => {
      this.list = ignore;
      this.length = ignore.length;


      for (let i = 0; i < this.list.length; i++) {
        this.list[i].index = i
      }

      this.pagination(this.list, this.length);

    })

  }

  
  // 已过期
  expired() {

    this.list = [];
    this.pageList = [];
    this.isquote = false;
    this.isshow = false
    this.exp = false;
 
    this.orderApi.yiquotelist({ quoteenterprise_id: this.enterprise_id }).then((list: any) => {

      for (let i = 0; i < list.length; i++) {

        if (list[i].quotestatus == 'E' || list[i].invalid == '是') {
          this.list.push(list[i])
        }
      }

      for (let i = 0; i < this.list.length; i++) {

        this.list[i].index = i

      }

      console.log(this.list, '888')
      this.length = this.list.length
      this.pagination(this.list, this.length);
    });


  }
 
  // 已报价
  quotedPrice() {
    this.list = [];
    this.pageList = [];
    this.isquote = false;
    this.isshow = false
    this.exp = true;
 
    this.orderApi.yiquotelist({ quoteenterprise_id: this.enterprise_id }).then((list: any) => {
      console.log(list, 'pppp')

      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hh = date.getHours();
      let mm = date.getMinutes();

      let nowtime = year + '-' + month + '-' + day + " " + hh + ":" + mm

      let shijian = date.getTime()

      for (let i = 0; i < list.length; i++) {
        if (list[i].invalid == '否' || list[i].quotestatus == 'C') {

          let newDate = new Date(list[i].expired_time)
          list[i].times = newDate.getTime()
          if (list[i].times < shijian && list[i].quotestatus == "W") {

            this.orderApi.editquotestatus({ quoteenterprise_id: this.enterprise_id, quotestatus: 'E', quote_id: list[i].quote_id }).then((editquotestatus: any) => {
              // if(editquotestatus){ 
              // }
            })

          }
          if (list[i].quotestatus == "W" || list[i].quotestatus == "C") {

            this.list.push(list[i])
          }
        }
        //break;

      }

      for (let i = 0; i < this.list.length; i++) {
        this.list[i].index = i
      }

      this.length = this.list.length
      this.pagination(this.list, this.length);
    });

  }

  // 全部
  allQuote() {
    console.log(event)
    this.list = [];
    this.pageList = [];
    this.isquote = false;
    this.isshow = true;
    this.exp = true;


    var a = this.orderApi

    this.orderapi.quotationlist({}).then((list:any)=>{
      console.log(list)
      var arr=[];
      for(var i=0;i<list.length;i++){
        list[i].index=i;
        if(list[i].quotestatus=='Q'){
          list[i].quotestatus_name='待报价';
        }else   if(list[i].quotestatus=='W'){
         list[i].quotestatus_name='已报价';
        }else   if(list[i].quotestatus=='H'){
          list[i].quotestatus_name='已忽略';
        }else   if(list[i].quotestatus=='S'){
         list[i].quotestatus_name='已失效';
        }

        if(list[i].quoteper==this.employee_id){
          arr.push(list[i]);
        }else {
          if(list[i].quotestatus=='W' || list[i].quotestatus=='S'){
            arr.push(list[i]);
          }
        } 
      }
      
      this.list=arr;
      this.pagination(this.list,this.list.length);
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

  pagination(list, length) {
    this.pageSize = 10;
    // if()
    this.pages = Math.ceil(length / this.pageSize)
    this.newPage = this.pages > 5 ? 5 : this.pages;
    this.selPage = 1;

    this.setData = function () {
      this.data = list.slice(this.pageSize * (this.selPage - 1), this.pageSize * this.selPage);
    }
    this.data = list.slice(0, this.pageSize);


    for (var i = 0; i < this.newPage; i++) {
      this.pageList.push(i + 1);
    }

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





