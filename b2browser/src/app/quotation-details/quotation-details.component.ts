import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-quotation-details',
  templateUrl: './quotation-details.component.html',
  styleUrls: ['./quotation-details.component.scss'],
  providers: [InstApi, OrderApi, EnterpriseApi]
})
export class QuotationDetailsComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public orderApi: OrderApi,
    public enterpriseApi: EnterpriseApi,
    public el: ElementRef,
  ) {
    super(router, activeRoute, instApi, orderApi, enterpriseApi);
  }


  quoteinfo = null;
  id = '';

  list = [];
  fittinglist = [];


  addConfir = false;
  employee_id = ''
  employee_id_name = ''
  enterprise_id_name = ''

  ratetype=[
    {id:1,name: 3},
    {id:2,name: 6},
    {id:3,name: 9},
    {id:4,name: 13},
  ];
  selectedSite=3;
  show=true;
  onMyShow() {
    let oldtime = (new Date()).getTime() + 6*60*60*1000;
    window.localStorage.setItem('oldtime', oldtime.toString())
    var a = this.orderApi
 
    this.activeRoute.queryParams.subscribe(queryParams => {
      console.log(queryParams,'拉开距离看')
      this.id = queryParams.id

      this.employee_id = queryParams.employee_id;
      this.employee_id_name = queryParams.employee_id_name;
      this.enterprise_id_name = queryParams.enterprise_id_name;

      a.quoteinfo({ id:  queryParams.id }).then((quoteinfo: any) => {
        console.log(quoteinfo,'quoteinfoquoteinfo')
        this.quoteinfo = quoteinfo;
        
        if(this.quoteinfo.namesplate=='' && this.quoteinfo.frontofcar=='' && this.quoteinfo.rearofcar==''){
          this.show=false
        }
        if(this.quoteinfo.photo1!='' && this.quoteinfo.photo1!=undefined){
          var arr =  this.quoteinfo.photo1.split(',')
          this.quoteinfo.arr = arr;
        }
        this.fittinglist = quoteinfo.fittingsitem;
        for (let i = 0; i < quoteinfo.fittingsitem.length; i++) {
          if (quoteinfo.fittingsitem[i].quoteitems.length != 0) {

            quoteinfo.fittingsitem[i].quoteitems = []

          }
          quoteinfo.fittingsitem[i].photoLen = 0
          if (quoteinfo.fittingsitem[i].photo1 != '' && quoteinfo.fittingsitem[i].photo1 != "undefined") {
            quoteinfo.fittingsitem[i].photoLen++
          }
          if (quoteinfo.fittingsitem[i].photo2 != '' && quoteinfo.fittingsitem[i].photo2 != "undefined") {
            quoteinfo.fittingsitem[i].photoLen++
          }
          if (quoteinfo.fittingsitem[i].photo3 != '' && quoteinfo.fittingsitem[i].photo3 != "undefined") {
            quoteinfo.fittingsitem[i].photoLen++
          }
          if (quoteinfo.fittingsitem[i].photo4 != '' && quoteinfo.fittingsitem[i].photo4 != "undefined") {
            quoteinfo.fittingsitem[i].photoLen++
          }
          if (quoteinfo.fittingsitem[i].photo5 != '' && quoteinfo.fittingsitem[i].photo5 != "undefined") {
            quoteinfo.fittingsitem[i].photoLen++
          }

        }

        for (let j = 0; j < this.fittinglist.length; j++) {
          this.fittinglist[j].price = ''
        }

        console.log(this.quoteinfo, 'quoteinfo')
        console.log(this.fittinglist, 'fittinglist')

      })

    })




  }
  photoshow2=false;
  img2=[];
  showPhoto2(){
    this.photoshow2=true;
    console.log(this.quoteinfo,'quo');
  
    
  }

  rate = '';
  tianxie = false;
  addQuote(item) {
    console.log(item);
    console.log(this.selectedSite,'kkk')
    // return 

    this.tianxie = false

    if (item.count >= 2) {

      for (var i = 0; i < this.fittinglist.length; i++) {

        if (item.id == this.fittinglist[i].id) {
          item.count++;
        }
      }
    } else {
      item.count = 2
    }
    if (item.partnubmer == "") {
      item.partnubmer = '无识别'
    }

    if (item.pinzhi == "") {
      item.pinzhi = '无'
    }

    if(this.quoteinfo.invoice_demand_value=='是'){
      this.rate= this.selectedSite.toString();
      let rates = item.price * Number( this.rate) / 100;
      item.rateprice = item.price + rates;
    }else {
      this.rate='0';
      item.rateprice = item.price;
    }

    // if (this.rate != '') {
    //   let rates = item.price * Number( this.rate) / 100;

    //   item.rateprice = item.price + rates;

    // }

    // if (this.rate == '') {
    //   this.rate = '0';
    //   item.rateprice = item.price;
    // }

    var addList = {
      fittings_id: item.id,
      name: item.name,
      partnubmer: item.partnubmer,
      quantity: item.quantity,
      quality: item.quality,
      standby_time: item.standby_time,
      guarantee: item.guarantee,
      price: item.price,
      Sprice: item.Sprice,
      rateprice: item.rateprice,
      sendcar_time: item.sendcar_time,
      count: item.count,
      rate: this.rate,
      pinzhi: item.pinzhi
    }

    console.log(addList)
    // for (let key in addList) {
    //   if (addList[key] == '') {
    //     console.log(key,'key')
      
    //   }
    // }
    if(!(this.checkkong(addList))){
      this.tianxie = true
        return
    }

    item.quality = ''
    item.standby_time = ''
    item.guarantee = ''
    item.price = ''
    item.sendcar_time = ''


    if (addList.price != 0) {

      for (var j = 0; j < this.fittinglist.length; j++) {

        if (this.fittinglist[j].id == item.id) {
          this.fittinglist[j].quoteitems.push(addList)
          this.fittinglist[j].count = addList.count
        }
      }

      this.list.push(addList)

    }

    this.baojia = false


  }

  photoshow = false
  imgs = []
  showPhoto(item) {
    this.imgs = []
    this.photoshow = true
    console.log(item)

    this.imgs.push(item)

    this.imgs = this.imgs.filter((item, index) => {
      if (item.photo1 == "" && item.photo2 != "") {
        item.photo1 = item.photo2
        item.photo2 = ""
      }
      if (item.photo1 == "" && item.photo2 == "" && item.photo3 != "") {
        item.photo1 = item.photo3
        item.photo3 = ""
      }
      if (item.photo1 == "" && item.photo2 == "" && item.photo3 == "" && item.photo4 != "") {
        item.photo1 = item.photo4
        item.photo4 = ""
      }
      if (item.photo1 == "" && item.photo2 == "" && item.photo3 == "" && item.photo4 == "" && item.photo5 != "") {
        item.photo1 = item.photo5
        item.photo5 = ""
      }
      return item
    })

    console.log(this.imgs)

  }



  deleteQuote(item) {

    for (let i = 0; i < this.list.length; i++) {
      if (item.fittings_id == this.list[i].fittings_id && item.count == this.list[i].count) {
        this.list.splice(i, 1)
      }
    }

    for (let j = 0; j < this.fittinglist.length; j++) {
      if (item.fittings_id == this.fittinglist[j].id) {
        for (let k = 0; k < this.fittinglist[j].quoteitems.length; k++) {
          if (item.count == this.fittinglist[j].quoteitems[k].count) {
            this.fittinglist[j].quoteitems.splice(k, 1)
          }
        }
      }
    }

  }



  baojia = false

  checkkong(josn) {
    for (let key in josn) {
      if (josn[key] == '') {
        console.log(key,josn[key],'333')
        return false
      }
    }
    return true
  }
  aa=0
  baojias(){

    for (let item of this.fittinglist) {
     
      if (item.partnubmer == "") {
        item.partnubmer = '无识别'
      }

      if (item.pinzhi == "") {
        item.pinzhi = '无'
      }

      if(this.quoteinfo.invoice_demand_value=='是'){
        this.rate= this.selectedSite.toString();
        let rates = item.price * Number( this.rate) / 100;
        item.rateprice = item.price + rates;
      }else {
        this.rate='0';
        item.rateprice = item.price;
      }

      // if (this.rate != '') {
      //   let rates = item.price * Number(this.rate) / 100;

      //   item.rateprice = item.price + rates;

      // }

      // if (this.rate == '') {
      //   this.rate = '0';
      //   item.rateprice = item.price;
      // }


      var addList = {
        fittings_id: item.id,
        name: item.name,
        partnubmer: item.partnubmer,
        quantity: item.quantity,
        Sprice: item.Sprice,
        quality: item.quality,
        standby_time: item.standby_time,
        guarantee: item.guarantee,
        price: item.price,
        sendcar_time: item.sendcar_time,
        rateprice:'1',
        // count: item.count,
        rate: this.rate,
        pinzhi: item.pinzhi
      }
      console.log(addList, 'uuuu')

      if (this.checkkong(addList)) {
        addList.rateprice=item.rateprice,
        this.aa++;
        this.list.push(addList);
        console.log('不为空哦')
      }else {
        console.log('有报价没填完')
      }

    }

    if(this.baojia==true){
      this.baojia = !this.baojia;
    }

    if(this.list.length==0){
      this.baojia=true;
      this.bb = false;
    }
   
  }
  enterprise_id=null;
  bb=true;

  saveQuote(enterprise_id) {
    this.enterprise_id = enterprise_id;
    var data = [];
    var jsonlist=[];
    var minprice = [];
    var maxprice = [];
    var minmoney = 0;
    var maxmoney = 0;
    var arr = []; 
    this.bb = true; 
    this.baojia = false;

    for (let f_id of data) {
      
        if (f_id != undefined) {
          var ddd = f_id.sort(function (a, b) {
            return a.price - b.price
          })
          minprice[ddd[0].fittings_id] = ddd[0].price
          maxprice[ddd[0].fittings_id] = ddd[ddd.length - 1].price
       
        }
  
    }
      
    for (let pp of minprice) {
       
        if (pp != undefined) {
          minmoney += pp
        }
    }
  
    for (let pp of maxprice) {
       
        if (pp != undefined) {
          maxmoney += pp
        }
    }
   
    for (let i = 0; i < this.list.length; i++) {
 
       if (!data[this.list[i].fittings_id]) { 
         arr.push(this.list[i]);
         data[this.list[i].fittings_id] = arr;
       } else {
         data[this.list[i].fittings_id].push(this.list[i])
       }
 
        var lists = {
          fittings_id: (this.list[i].fittings_id),
          partnubmer: (this.list[i].partnubmer),
          name: (this.list[i].name),
          price: (this.list[i].price),
          Sprice: (this.list[i].Sprice),
          qty: (this.list[i].quantity),
          quality: (this.list[i].quality),
          standby_time: (this.list[i].standby_time),
          guarantee: (this.list[i].guarantee),
          sendcar_time: (this.list[i].sendcar_time),
          rate: (this.list[i].rate),
          pinzhi: (this.list[i].pinzhi),
          rateprice: (this.list[i].rateprice),
          enterprise_id: this.enterprise_id,
          employee_id: this.employee_id,
          minprice: minmoney,
          maxprice: maxmoney,
          minrate: (minmoney + minmoney * Number(this.rate) / 100),
          maxrate: (maxmoney + maxmoney * Number(this.rate) / 100),
  
        }
  
 
        jsonlist.push(lists);
  
    }

    var datajson=JSON.stringify(jsonlist);
  
    this.orderApi.confirmquote({datajson:datajson}).then((confirmquote) => {
       
       this.editStatus(this.enterprise_id);  
    })
 
    
  }

  

 




  kong(json,arr){
    
    console.log(json,'json')
    for(let ii of arr){
      if(json.fittings_id!=ii.fittings_id){
        if(!(json.quality==""&&json.standby_time==''&&json.guarantee==""&&json.price==""&&json.sendcar_time=='')){
          return true
        }else if(json.quality==""||json.standby_time==''||json.guarantee==""||json.price==""||json.sendcar_time==''){
          return false
        }
      }
    }
    return false
  }




  compare(pro) {
    return function (a, b) {
      return a[pro] - b[pro]
    }
  }

 

  editStatus(enterprise_id) {

    var date1 = new Date();
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + 3);
    console.log(date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate());
    console.log(date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate());

    var a = this.orderApi
    this.quoteinfo.quotestatus = "W"
    this.quoteinfo.quoteemployee_id = this.employee_id
    this.quoteinfo.quoteenterprise_id = enterprise_id
    this.quoteinfo.invalid = 'N'
    this.quoteinfo.rate = this.selectedSite
    this.quoteinfo.invoice_demand = this.quoteinfo.invoice_demand_value
    this.quoteinfo.yiquoted_time = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + (date1.getDate()) + " " + (date1.getHours()) + ":" + (date1.getMinutes())
    this.quoteinfo.expired_time = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate() + " " + (date2.getHours()) + ":" + (date2.getMinutes())
    console.log(this.quoteinfo)

    a.editquote({ id: this.quoteinfo.id, quotestatus: "W" }).then((editquote: any) => {
      if (editquote.code == '0') {
        a.editquotation({ quote_id: this.quoteinfo.id, quotecompan_id: enterprise_id, quotestatus: 'W',rate:this.quoteinfo.rate }).then((ret) => {
          if (ret) {
            this.router.navigate(['detailsOfQuotedPrice'], {
              queryParams: {
                quote_id: this.quoteinfo.id
              }
            })
          }
        })

      }


    })




  }
  fanhui(){
    this.navigate('quotationCenter',{aa:this.params.aa})
  }
}