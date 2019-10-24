// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  OrderApi
} from "../../apis/order.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id = 24;
    super.onLoad(options);
    this.Base.setMyData({
      //num: 0,
      allprice: 0,
      chosse: 1
    })
  }

  onMyShow() {
    var that = this;
    var price = 0;
    var num=0;
    var orderapi = new OrderApi();
    orderapi.shopcarlist({
      quote_id: this.Base.options.id
    }, (shopcarlist) => {

      var etplist = {};

      for (var i = 0; i < shopcarlist.length; i++) {
        //shopcarlist[i].check = false;
        if (shopcarlist[i].ck_value=='Y'){
          num++;
          price += (parseInt(shopcarlist[i].price) * parseInt(shopcarlist[i].qty))
        }
        var list = shopcarlist[i]
        if (!etplist[list.enterprise_id]) {
          etplist[list.enterprise_id] = [];
        }
        etplist[list.enterprise_id].push(list)
      }

      var alllist = [];
      
      for (var key in etplist) {

        for (var i in etplist[key]) {
          alllist.push({
            id: key,
            enterprise_name: etplist[key][i].enterprise_id_name,
            name: etplist[key],
            allcheck: false
          })
          break;
        }

        // for (var s in etplist[key]) {
        //   price += (parseInt(etplist[key][s].price) * parseInt(etplist[key][s].qty))
        // }

      }

      this.Base.setMyData({
        shopcarlist,
        alllist,
        num,
        price
      })
    })

  }
 

  bindchoose(e) {
    var alllist = this.Base.getMyData().alllist;
    var id = e.currentTarget.id;
    var qtylist = alllist[id].name;
  //  var num = this.Base.getMyData().num;
    var allprice = this.Base.getMyData().allprice;
    var chosse = this.Base.getMyData().chosse;
    //console.log(qtylist+"ddd")


    if (alllist[id].allcheck == false) {
      for (var i = 0; i < qtylist.length; i++) {
        qtylist[i].check = true;
      }

      alllist[id].allcheck = true;
    } else {
      for (var i = 0; i < qtylist.length; i++) {
        qtylist[i].check = false;
      }
      alllist[id].allcheck = false;
      this.Base.setMyData({ chosse: 1 })
    }


    for (var a = 0; a < qtylist.length; a++) {
      if (qtylist[a].check == true) {
        allprice += parseInt(qtylist[a].price) * parseInt(qtylist[a].qty);
      //  num++;
        //console.log(num);
      } else {
        allprice -= parseInt(qtylist[a].price) * parseInt(qtylist[a].qty);
      //   num--
      }
    }

    this.Base.setMyData({
      alllist: alllist,
      //  num,
      allprice
    })
    
    console.log("ddd")

  }


  bindcheck(e) {
    var alllist = this.Base.getMyData().alllist;
    var idx = e.currentTarget.id;
    var carid = e.currentTarget.dataset.carid;
    var index = e.currentTarget.dataset.index; 
    var qtylist = alllist[index].name;
    var checking = qtylist[idx].ck_value;
    var orderapi = new OrderApi();
    var chosse = this.Base.getMyData().chosse;
    var num = 0;
    var allprice = 0;

    if (checking == "Y") {
      this.Base.setMyData({chosse:1});
      orderapi.updatecheck({ ck: 'N', id: carid}, (updatecheck)=>{
        this.onMyShow();
        // this.Base.setMyData({})
      })

      alllist[index].name[idx].check = false;
      alllist[index].allcheck = false;
    } else {
      orderapi.updatecheck({ ck: 'Y', id: carid }, (updatecheck) => {
        // this.Base.setMyData({})
        this.onMyShow();
      })
      alllist[index].name[idx].check = true
    }

    for (var m = 0; m < alllist.length; m++) {
      var qtylist = alllist[m].name;
      for (var a = 0; a < qtylist.length; a++) {
        if (qtylist[a].ck_value == 'Y') {
          //var num = qtylist.length;
          allprice += parseInt(qtylist[a].price) * parseInt(qtylist[a].qty);
          num++;
          //console.log(qtylist.length);
        }
      }
    }

    

    this.Base.setMyData({
     // alllist,
      num,
      allprice
    })

    //console.log(checking,"pp")

  }

  bindallcheck(e) {
    var type = e.currentTarget.id;
    var alllist = this.Base.getMyData().alllist;
    //var num = 0;
    var allprice = 0;

    for (var m = 0; m < alllist.length; m++) {
      var qtylist = alllist[m].name;
      if (type == 2) {
        alllist[m].allcheck = true;
      } else {
        alllist[m].allcheck = false;
      }

      for (var a = 0; a < qtylist.length; a++) {
        if (type == 2) {
          qtylist[a].check = true;
        } else {
          qtylist[a].check = false;
        }
        if (qtylist[a].check == true) {
          //var num = qtylist.length;
          allprice += parseInt(qtylist[a].price) * parseInt(qtylist[a].qty);
         // num++;
          //console.log(qtylist.length);
        }
      }
    }

    this.Base.setMyData({
      chosse: type, alllist,   allprice
    })
  }


  bindjisuan(e) {
    var orderapi = new OrderApi();
    var id = e.currentTarget.id;
    var name = e.currentTarget.dataset.name;
    var index = e.currentTarget.dataset.index;
    var idx = e.currentTarget.dataset.idx;
    var shopcarlist = this.Base.getMyData().shopcarlist;
    var alllist = this.Base.getMyData().alllist;
    var allprice = 0;
 
    // console.log("类型:" + name, 'id:', id,"来来来", index)
    



    if (name == 'jian') {
      if (alllist[index].name[idx].qty > 1) { 
        orderapi.updateqty({ type: 'B', id: id }, (updatecheck) => {
          this.onMyShow();
        })
      } else {
        wx.showToast({
          title: '数量至少为1',
          icon: 'none'
        })
      }
    } else {
      orderapi.updateqty({ type: 'A', id: id }, (updatecheck) => {
        this.onMyShow();
      })
      //alllist[index].name[idx].qty++
    }


    for (var m = 0; m < alllist.length; m++) {
      var qtylist = alllist[m].name;
      for (var a = 0; a < qtylist.length; a++) {
        if (qtylist[a].check == true) {
          //var num = qtylist.length;
          allprice += parseInt(qtylist[a].price) * parseInt(qtylist[a].qty);
          //console.log(qtylist.length);
        }
      }
    }


    this.Base.setMyData({
      alllist,
      allprice
    })
  }

  bindjiesuan() {
    var lista = this.Base.getMyData().alllist;

    var linjian = [];

    for (var i = 0; i < lista.length; i++) {
      var list = lista[i].name;

      for (var j = 0; j < list.length; j++) {
        if (list[j].check == true) {
          linjian.push(list[j]);
        }
      }

    }

    this.Base.setMyData({
      linjian
    })
    // return;
    wx.navigateTo({
      url: '/pages/orderdetail/orderdetail?json=' + JSON.stringify(linjian) + '&carmodel=' + this.Base.options.carmodel + '&vin=' + this.Base.options.vin + '&id=' + this.Base.options.id
    })

  }






}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindjiesuan = content.bindjiesuan;
body.bindjisuan = content.bindjisuan;

body.bindchoose = content.bindchoose;
body.bindcheck = content.bindcheck;
body.bindallcheck = content.bindallcheck;
Page(body)