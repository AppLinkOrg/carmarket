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

import {
  AddressApi
} from "../../apis/address.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      qty: 1,
      xuan: 'N',
      quan: 'B'
      // vin: this.Base.options.vin,
      // carname: this.Base.options.carname,
    });
  }
  onMyShow() {
    var that = this;
    var orderapi = new OrderApi();

    var json = JSON.parse(this.Base.options.json)
    console.log(json, "来了")
    var sumprice = 0;

    for (var i = 0; i < json.length; i++) {
      var ent = json[i].name;
      var aaa = 0;
      for (var j = 0; j < ent.length; j++) {
        // console.log(parseInt(ent[j].price), "||",parseInt (ent[j].qty))
        aaa += parseInt((ent[j].price) * (ent[j].qty));
        //console.log(aaa,"店铺价格")
      }
      json[i].pp = aaa;
      sumprice += aaa;
    }

    this.Base.setMyData({
      arr: json,
      sumprice
    })

  }


  binddizhi(e) {
    this.Base.setMyData({
      dizhi: e.detail.value
    })
  }

  bindtijiao() {
    wx.navigateTo({
      url: '/pages/ordersubmit/ordersubmit',
    })
  }

  setPageTitle(instinfo) {
    var title = "订单提交";
    wx.setNavigationBarTitle({
      title: title,
    })
  }

  check(e) {
    //this.Base.setMyData({})
  }

  submit(e) {
    var that =this;
    var orderapi = new OrderApi();
    var sumprice = this.Base.getMyData().sumprice;
    var arr = this.Base.getMyData().arr;
 

    console.log(this.Base.getMyData().employeeinfo.id,"啦啦啦啦啦啦啦啦");
   // return;
    wx.showModal({
      title: '购买',
      content: '确认购买？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          
          for (var i = 0; i < arr.length; i++) {
            var list = {
              orderno: '',
              enterprise_id: arr[i].id,
              employee_id: that.Base.getMyData().employeeinfo.id,
              totalamount: arr[i].pp,
              vin:that.Base.options.vin,
              carname:that.Base.options.carmodel,
              receiver: '测试',
              receivecontact: '12345678910',
              receiveaddress: '测试地址',
              order_status: 'L',
              status: 'A'
            }
            
            that.submitlist(list, i);
            
            orderapi.updatemoney({
              id: that.Base.getMyData().employeeinfo.id,
              money: sumprice
            }, (updatemoney) => {
            })

          }


        }
      }
    })

  }

  submitlist(json, i) {

    var that = this;
    var orderapi = new OrderApi();
    var id = [];
    setTimeout(() => {
      orderapi.settle(json, (settle) => {
          
      })
      
    }, i * 300)

    wx.navigateTo({
      url: '/pages/jiaoyisuccess/jiaoyisuccess'
    })
    
  }


  fits() {

  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindyou = content.bindyou;
body.bindtijiao = content.bindtijiao;
body.confirm = content.confirm;

body.submit = content.submit;
body.submitlist = content.submitlist;

body.check = content.check;

body.bindreduce = content.bindreduce;
body.bindadd = content.bindadd;
body.binddizhi = content.binddizhi;
body.binddelect = content.binddelect;
body.bindchoice = content.bindchoice;
body.bindallchoice = content.bindallchoice;
Page(body)