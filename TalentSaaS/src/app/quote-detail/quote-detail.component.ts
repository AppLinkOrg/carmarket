import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
import { MainComponent } from '../main/main.component';
import { ApiConfig } from '../api.config';

@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.component.html',
  styleUrls: ['./quote-detail.component.scss'],
  providers: [InstApi, MemberApi, OrderApi]
})
export class QuoteDetailComponent extends AppBase {

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
    this.primary_id = this.params.id;
  }
  quoteinfo = null;
  primary_id = 0;
  ratetype = [
    { id: 1, name: 3 },
    { id: 2, name: 6 },
    { id: 3, name: 9 },
    { id: 4, name: 13 },
  ];
  selectedSite = 3;
  rate = '';
  fittinglist = [];
  ishow = false;
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("quote", "quote");
    }
    if (this.primary_id > 0) {
      this.orderApi.quoteinfo({ id: this.primary_id }).then((quoteinfo: any) => {
        for (let i = 0; i < quoteinfo.fittingsitem.length; i++) {
          // if (quoteinfo.fittingsitem[i].quoteitems.length != 0) {

          quoteinfo.fittingsitem[i].quoteitems = [];

          // }
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
        this.fittinglist = quoteinfo.fittingsitem;
        for (let j = 0; j < this.fittinglist.length; j++) {
          this.fittinglist[j].price = ''
        }



        if (quoteinfo.carmodel == 'undefined' || quoteinfo.carmodel == '') {
          this.ishow = true;

        }
        this.quoteinfo = quoteinfo;
      })
    }
  }
  photoshow2 = false;
  showPhoto2() {
    this.photoshow2 = true;
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
  jsonlist = [];
  addQuote(item) {
    console.log(item);
    var json = {
      quality: item.quality,
      standby_time: item.standby_time,
      guarantee: item.guarantee,
      price: item.price,
      sendcar_time: item.sendcar_time,
    }
    if (!this.checknull(json)) {
      this.toast('请填写完成!');
      return
    }
    if (item.partnubmer == "") {
      item.partnubmer = '无识别'
    }

    if (item.pinzhi == "") {
      item.pinzhi = '无'
    }
    if (this.quoteinfo.invoice_demand_value == 'Y') {
      console.log(this.selectedSite, '看看这个税率');
      this.rate = this.selectedSite.toString();
      let rates = item.price * Number(this.rate) / 100;
      item.rateprice = item.price + rates;
    } else {
      this.rate = '0';
      item.rateprice = item.price;
    }


    var addlist = null;
    addlist = json;
    addlist.fittings_id = item.id;
    addlist.name = item.name;
    addlist.partnubmer = item.partnubmer;
    addlist.quantity = item.quantity;
    addlist.Sprice = item.Sprice;
    addlist.rateprice = '1';
    addlist.rate = this.rate;
    addlist.pinzhi = item.pinzhi;
    // addlist.minprice = minmoney;
    // addlist.maxprice = maxmoney;
    // addlist.minrate = (minmoney + minmoney * Number(this.rate) / 100);
    // addlist.maxrate = (maxmoney + maxmoney * Number(this.rate) / 100);

    item.quality = '';
    item.standby_time = '';
    item.guarantee = '';
    item.price = '';
    item.sendcar_time = '';

    if (addlist.price != 0) {

      for (var j = 0; j < this.fittinglist.length; j++) {
        if (this.fittinglist[j].id == item.id) {
          this.fittinglist[j].quoteitems.push(addlist)
          this.fittinglist[j].count = addlist.count
        }
      }
      this.jsonlist.push(addlist)
    }
  }
  curitem = null;
  a = null;
  deletequote(item, a) {
    this.curitem = item;
    this.a = a;
  }
  deletequote2() {
    var item = this.curitem;
    var a = this.a;
    console.log(item)
    for (let i = 0; i < this.jsonlist.length; i++) {
      if (item.fittings_id == this.jsonlist[i].fittings_id && a == i) {
        this.jsonlist.splice(i, 1);
      }
    }

    for (let j = 0; j < this.fittinglist.length; j++) {
      if (item.fittings_id == this.fittinglist[j].id) {
        for (let k = 0; k < this.fittinglist[j].quoteitems.length; k++) {
          if (a == k) {
            this.fittinglist[j].quoteitems.splice(k, 1);
          }
        }
      }
    }
  }
  checknull(json) {
    for (let key in json) {
      if (json[key] == '') {
        return false
      }
    }
    return true
  }
  yibao = false;
  list = [];
  tijiao() {
    this.orderApi.quoteinfo({ id: this.primary_id }).then((quoteinfo: any) => {
      if (quoteinfo.quotestatus == 'W') {
        this.yibao = true;
      }
    })
    this.list = [];
    for (let item of this.fittinglist) {

      if (item.partnubmer == "") {
        item.partnubmer = '无识别'
      }

      if (item.pinzhi == "") {
        item.pinzhi = '无'
      }

      if (this.quoteinfo.invoice_demand_value == 'Y') {
        this.rate = this.selectedSite.toString();
        let rates = item.price * Number(this.rate) / 100;
        item.rateprice = item.price + rates;
      } else {
        this.rate = '0';
        item.rateprice = item.price;
      }
      var json = {
        quality: item.quality,
        standby_time: item.standby_time,
        guarantee: item.guarantee,
        price: item.price,
        sendcar_time: item.sendcar_time,
      }

      if (!this.checknull(json)) {
        this.toast('您有报价未填完');
        return
      }

      var addlist = null;
      addlist = json;
      addlist.fittings_id = item.id;
      addlist.name = item.name;
      addlist.partnubmer = item.partnubmer;
      addlist.quantity = item.quantity;
      addlist.Sprice = item.Sprice;
      addlist.rateprice = '1';
      addlist.rate = this.rate;
      addlist.pinzhi = item.pinzhi;

      this.list.push(addlist);
    }

  }
  savequote() {
    console.log(this.list, this.jsonlist);
    var arr = this.list.concat(this.jsonlist);
    console.log(arr, '11');
    console.log(this.fittinglist, '22');
    for(let item of this.fittinglist){
      this.addQuote(item);
    }
    console.log(this.fittinglist, '33');
      var minprice = [];
      var maxprice = [];
      var minmoney = 0;
      var maxmoney = 0;
      var data = [];

      for (let f_json of this.fittinglist) {

        if (f_json != undefined) {
          var ddd = f_json.quoteitems.sort(function (a, b) {
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
      

      for(let item of this.jsonlist){
        item.minprice=minmoney;
        item.maxprice= maxmoney;
        item.enterprise_id= this.memberinfo.enterprise.id;
        item.employee_id= this.memberinfo.id;
        if(this.rate!='' || Number(this.rate)>0){
          item.minrate= (minmoney + minmoney * Number(this.rate) / 100);
          item.maxrate= (maxmoney + maxmoney * Number(this.rate) / 100);
        }else {
          item.minrate=0;
          item.maxrate= 0;
        }
       
      }
      var datajson=JSON.stringify(this.jsonlist);

      this.orderApi.confirmquote({datajson:datajson}).then((confirmquote) => {
  
         this.editStatus();  
      })
    console.log(minmoney, '----', maxmoney)
    console.log(this.jsonlist);
  }
  editStatus(){
    
    var date1 = new Date();
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + 3);
    console.log(date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate());
    console.log(date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate());
    var enterprise_id = this.memberinfo.enterprise.id;
    var a = this.orderApi;
    this.quoteinfo.quotestatus = "W";
    this.quoteinfo.quoteemployee_id = this.memberinfo.id;
    this.quoteinfo.quoteenterprise_id = enterprise_id;
    this.quoteinfo.invalid = 'N';
    this.quoteinfo.rate = this.selectedSite;
    this.quoteinfo.invoice_demand = this.quoteinfo.invoice_demand_value;
    this.quoteinfo.yiquoted_time = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + (date1.getDate()) + " " + (date1.getHours()) + ":" + (date1.getMinutes());
    this.quoteinfo.expired_time = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate() + " " + (date2.getHours()) + ":" + (date2.getMinutes());
    console.log(this.quoteinfo);

    a.editquote({ id: this.quoteinfo.id, quotestatus: "W" }).then((editquote: any) => {
      if (editquote.code == '0') {
        a.editquotation({ quote_id: this.quoteinfo.id, quotecompan_id: enterprise_id, quotestatus: 'W', rate: this.quoteinfo.rate, quoteper: this.memberinfo.id }).then((ret) => {
          if (ret) {
            this.router.navigate(['quoteprice'], {
              queryParams: {
                quote_id: this.quoteinfo.id,
                type:this.params.type
              }
            })
          }
        })

      }


    })
  }
  fanhui() {
    this.navigate('quotecenter',{type:this.params.type});
  }
}
