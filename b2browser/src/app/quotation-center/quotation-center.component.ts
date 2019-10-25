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
    super(router, activeRoute, instApi,enterpriseApi);
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

  enterprise_id = ''
  enterprise_id_name = ''
  employee_id = ''
  employee_id_name = ''

  onMyShow() {


    var a = this.orderApi;

    this.enterpriseApi.employeeinfo({}).then((employeeinfo: any) => {
      console.log(employeeinfo)
      this.enterprise_id = employeeinfo.enterprise_id
      this.employee_id = employeeinfo.id
      this.employee_id_name = employeeinfo.name
      this.enterprise_id_name = employeeinfo.enterprise.name

      a.quotelist({}).then((list: any) => {
        console.log(list,'list')

        a.quotationlist({}).then((quotationlist:any)=>{
          if(quotationlist.length==0){
            for (let item of list) {
    
              if(item.quotestatus=='Q'){
                    
                    item.quote_id = item.id
                      a.addquotation(item).then((addquotation:any)=>{
                        console.log(addquotation,'addquotation')
                      })
                    
                }
            }
          }else {
              for (let item of list) {
    
                if(item.quotestatus=='Q'){
                      if(this.notinignore(item,quotationlist)){
                        item.quote_id = item.id
                        a.addquotation(item).then((addquotation:any)=>{
                          console.log(addquotation,'addquotation')
                        })
                      }
                     
                  }
              }
           
          }
         
        })
            
            


      a.ignore({ quoteenterprise_id: this.enterprise_id, quoteemployee_id: this.employee_id }).then((ignore: any) => {
        // this.ignore = ignore

        console.log(ignore, 'ignore')
        console.log(ignore.length, 'ignore.length')

        if (ignore.length == 0) {
          a.yiquotelist({quoteenterprise_id: this.enterprise_id}).then((yiquotelist:any)=>{
            console.log(yiquotelist,'yiquotelist')
            console.log(yiquotelist.length,'yiquotelist.lenght')

            if(yiquotelist.length == 0){

              a.quotationlist({}).then((list: any) => {
                console.log(list, 'lsit')

                  for (let item of list) {
                    if (item.quotestatus == 'Q') {
    
                      item.photoLen = 0
                      console.log(item)
      
                      if (item.frontofcar != '') {
                        item.photoLen++
                      }
                      if (item.namesplate != '') {
                        item.photoLen++
                      }
                      if (item.rearofcar != '') {
                        item.photoLen++
                      }
                      if (item.photo1 != '') {
                        item.photoLen++
                      }
                      if (item.photo2 != '') {
                        item.photoLen++
                      }
                      this.list.push(item)
                    }
                  }
        
                  for (let i = 0; i < this.list.length; i++) {
                    this.list[i].index = i
                  }
      
                  this.length = this.list.length;
                  this.pagination(this.list, this.length);
                  console.log(this.list)

              })
            }else {

              a.quotationlist({}).then((list: any) => {
                console.log(list, 'bbb')
                var result = [];
                for (let item of list) {
                  if (item.quotestatus === 'Q') {
                    if (this.notinignore2(item, yiquotelist)) {

                      item.photoLen = 0
                      if (item.frontofcar != '' && item.frontofcar !="undefined") {
                        item.photoLen++
                      }
                      if (item.namesplate != '' && item.namesplate !="undefined") {
                        item.photoLen++
                      }
                      if (item.rearofcar != '' && item.rearofcar !="undefined") {
                        item.photoLen++
                      }
                      if (item.photo1 != '' && item.photo1 !="undefined") {
                        item.photoLen++
                      }
                      if (item.photo2 != '' && item.photo2 !="undefined") {
                        item.photoLen++
                      }

                      result.push(item);
                    }
                  }
    
                }
    
                this.list = result;
    
                for (let i = 0; i < this.list.length; i++) {
                  this.list[i].index = i
                }
    
                this.length = this.list.length;
                this.pagination(this.list, this.length);
    
              });
            }
    
          })

        } else {

          a.yiquotelist({quoteenterprise_id: this.enterprise_id}).then((yiquotelist:any)=>{
            console.log(yiquotelist,'yyyyy')

            if(yiquotelist.length == 0){

              a.quotationlist({}).then((list: any) => {
                console.log(list, 'list')
                var result = [];
                  for (let item of list) {
                    if (item.quotestatus == 'Q') {
    
                      if (this.notinignore2(item, ignore)) {
                        item.photoLen = 0
                        console.log(item)
        
                        if (item.frontofcar != '' && item.frontofcar !="undefined") {
                          item.photoLen++
                        }
                        if (item.namesplate != '' && item.namesplate !="undefined") {
                          item.photoLen++
                        }
                        if (item.rearofcar != '' && item.rearofcar !="undefined") {
                          item.photoLen++
                        }
                        if (item.photo1 != '' && item.photo1 !="undefined") {
                          item.photoLen++
                        }
                        if (item.photo2 != '' && item.photo2 !="undefined") {
                          item.photoLen++
                        }
                        result.push(item);

                      }
                      
                     
                      // this.list.push(item)
                    
                    }
                  }
                  this.list = result;
        
                  for (let i = 0; i < this.list.length; i++) {
                    this.list[i].index = i
                  }
      
                  this.length = this.list.length;
                  this.pagination(this.list, this.length);
                  console.log(this.list)

              })
            }else {

              a.quotationlist({}).then((list: any) => {
                console.log(list, 'list')
                var result = [];
                for (let item of list) {
                  if (item.quotestatus === 'Q') {
                    item.photoLen = 0
                    
                    if (item.frontofcar != '' && item.frontofcar !="undefined") {
                      item.photoLen++
                    }
                    if (item.namesplate != '' && item.namesplate !="undefined") {
                      item.photoLen++
                    }
                    if (item.rearofcar != '' && item.rearofcar !="undefined") {
                      item.photoLen++
                    }
                    if (item.photo1 != '' && item.photo1 !="undefined") {
                      item.photoLen++
                    }
                    if (item.photo2 != '' && item.photo2 !="undefined") {
                      item.photoLen++
                    }

                    console.log('尽快发货方')
                    console.log(this.notinignore2(item, yiquotelist),'jjjjdddddd')
                    if (this.notinignore2(item, yiquotelist)) {
                      console.log('斤斤计较')
                      if (this.notinignore2(item, ignore)) {
                        console.log('jjjjj')
                        result.push(item);
                      }
                    }
                      
                  }
    
                }
                console.log(result,'kkkkk')
    
                this.list = result;
    
                for (let i = 0; i < this.list.length; i++) {
                  this.list[i].index = i
                }
    
                this.length = this.list.length;
                this.pagination(this.list, this.length);
    
              });
            }
    
          })

        }

      })

    })
    
      a.distinctlist({}).then((distinctlist: any) => {
        console.log(distinctlist, "33333")
        this.distinctlist = distinctlist
      })


    })






  }

  distinct = []

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
    console.log(this.list,'555555')
    let temp = []
    for (let i = 0; i < this.list.length; i++) {
      for (let j = 0; j < this.distinct.length; j++) {

        if (this.distinct[j] == "全部") {

          temp.push(this.list[i])

        } else {

          if(this.hasClass(this.distinct[j],'disname-active')){
            console.log(this.distinct[j].innerText)

            if (this.list[i].enterprise_corporate_address == this.distinct[j].innerText) {
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

    console.log(temp,'6666')

    this.length = temp.length

    this.pagination(temp, this.length)
    console.log(temp)

  }


  photoshow = false
  imgs = []
  showPhoto(item) {
    console.log(item)
    this.imgs = []
    this.photoshow = true
    console.log(item)

    this.imgs.push(item)

    this.imgs = this.imgs.filter((item, index) => {
      if (item.frontofcar == ""  && item.namesplate != "") {
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
      if (item.frontofcar == "" && item.namesplate == "" && item.rearofcar == "" && item.photo1 == "" && item.photo2 != "") {
        item.frontofcar = item.photo2
        item.photo2 = ""
      }
      return item
    })

    console.log(this.imgs)

  }




  ignoreHandle(item) {
    this.list = [];
    this.pageList = [];
    // item.quote_id = item.id
    item.ignorestatus = 'Y'
    item.quoteemployee_id = this.employee_id
    item.quoteenterprise_id = this.enterprise_id
    console.log(item)


    this.orderApi.addignore(item).then((searchignore: any) => {

      if (searchignore.code == "0") {

        this.onMyShow()


      }
    })

  }

  screening() {

  }



  // 待报价
  quoteHandle(e) {
    this.list = [];
    this.pageList = [];
    this.isquote = true;
    this.isshow = false


    let current = e.target
    current.classList.add('btn-active')
    let others = e.target.parentElement.childNodes

    for (let i = 0; i < others.length; i++) {
      if (others[i] != current) {
        others[i].classList.remove('btn-active')
      }
    }

    this.onMyShow()



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


  // 已忽略
  neglected(e) {
    this.list = [];
    this.pageList = [];
    this.isshow = false
    this.isquote = false;

    let current = e.target
    current.classList.add('btn-active')
    let others = e.target.parentElement.childNodes

    for (let i = 0; i < others.length; i++) {
      if (others[i] != current) {
        others[i].classList.remove('btn-active')
      }
    }

    this.orderApi.ignore({ quoteenterprise_id: this.enterprise_id, quoteemployee_id: this.employee_id }).then((ignore: any) => {
      this.list = ignore;
      this.length = ignore.length;


      for (let i = 0; i < this.list.length; i++) {
        this.list[i].index = i
      }

      this.pagination(this.list, this.length);

    })

  }


  // 已过期
  expired(e) {

    this.list = [];
    this.pageList = [];
    this.isquote = false;
    this.isshow = false

    let current = e.target
    current.classList.add('btn-active')
    let others = e.target.parentElement.childNodes

    for (let i = 0; i < others.length; i++) {
      if (others[i] != current) {
        others[i].classList.remove('btn-active')
      }
    }

   

    this.orderApi.yiquotelist({quoteenterprise_id: this.enterprise_id}).then((list: any) => {

      for (let i = 0; i < list.length; i++) {
        
        if(list[i].quotestatus == 'E'){
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
  quotedPrice(e) {
    this.list = [];
    this.pageList = [];
    this.isquote = false;
    this.isshow = false

    let current = e.target
    current.classList.add('btn-active')
    let others = e.target.parentElement.childNodes

    for (let i = 0; i < others.length; i++) {
      if (others[i] != current) {
        others[i].classList.remove('btn-active')
      }
    }


    this.orderApi.yiquotelist({ quoteenterprise_id: this.enterprise_id }).then((list: any) => {
      console.log(list,'pppp')

      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hh = date.getHours();
      let mm = date.getMinutes();
  
      let nowtime = year + '-' + month + '-' + day +" "+ hh +":"+ mm
      console.log(nowtime,'5555')

      for (let i = 0; i < list.length; i++) {
        if (list[i].quotestatus == "W") {
          
          if (list[i].expired_time_dateformat < nowtime) {
            this.orderApi.editquotestatus({quoteenterprise_id: this.enterprise_id,quotestatus: 'E'}).then((editquotestatus:any)=>{
              console.log(editquotestatus)
            })
          
          }else {
            this.list.push(list[i])
          }
        
        }

      }

      for (let i = 0; i < this.list.length; i++) {
        this.list[i].index = i
      }

      this.length = this.list.length
      this.pagination(this.list, this.length);
    });

  }

  // 全部
  allQuote(e) {
    console.log(event)
    this.list = [];
    this.pageList = [];
    this.isquote = false;
    this.isshow = true

    let current = e.target
    current.classList.add('btn-active')
    let others = e.target.parentElement.childNodes

    for (let i = 0; i < others.length; i++) {
      if (others[i] != current) {
        others[i].classList.remove('btn-active')
      }
    }

    var a = this.orderApi
    

    a.yiquotelist({quoteenterprise_id: this.enterprise_id }).then((yiquotelist:any)=>{
      console.log(yiquotelist,'yiquotelist')
      // let yiquotelists = yiquotelist
      if(yiquotelist.length==0){
        let result = []
        a.quotationlist({}).then((quotelist:any)=>{
          for(let item of quotelist){
            if(item.quotestatus=='Q'){
              result.push(item)
            }
          }
  
          this.list = result
          for (let i = 0; i < this.list.length; i++) {
            this.list[i].index = i
          }
          this.length = this.list.length
          this.pagination(this.list,this.length)
        })
      }else {
        let result = []
        a.quotationlist({}).then((quotelist:any)=>{
          console.log(quotelist,'quotelsit')
          for(let item of quotelist){
            if(item.quotestatus=='Q'){
              console.log(item,'item')
              result.push(this.panduan(item,yiquotelist)) 
          }
        }
  
          this.list = result
          for (let i = 0; i < this.list.length; i++) {
            this.list[i].index = i
          }
          console.log()
          this.length = this.list.length
          this.pagination(this.list,this.length)
        })
      }
     
    })


  }

  panduan(item,yiquote){
    for(let yiitem of yiquote){
      if(item.quote_id==yiitem.quote_id){
        return yiitem
      }
    }
    return item
  }



  tiaozhuan(itemId,quote_id) {
    this.router.navigate(['quotationDetails'], {
      queryParams: {
        id: itemId,
        quote_id: quote_id,
        employee_id: this.employee_id,
        employee_id_name: this.employee_id_name,
        enterprise_id_name: this.enterprise_id_name
      }
    })
  }

  tiaozhuan2(itemId) {
    this.router.navigate(['detailsOfQuotedPrice'], {
      queryParams: {
        quote_id: itemId,

      }
    })
  }

  pagination(list, length) {
    this.pageSize = 10;
    // if()
    this.pages = Math.ceil(length / this.pageSize)
    this.newPage = this.pages > 10 ? 10 : this.pages;
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





