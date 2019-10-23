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

    var shopcarlist = JSON.parse(this.Base.options.json);

    if (this.Base.getMyData().info != undefined) {
      this.Base.setMyData({
        addressinfo: this.Base.getMyData().info
      })
    } else {
      var addressapi = new AddressApi();
      addressapi.addresslist({

      }, (addresslist) => {

        var address = addresslist.filter((item, idx) => {
          return item.morenaddress_value == 'Y';
        })

        this.Base.setMyData({
          addressinfo: address[0]
        })

      })
    }





    var etplist = {};

    for (var i = 0; i < shopcarlist.length; i++) {
      shopcarlist[i].check = false;
      var list = shopcarlist[i]
      if (!etplist[list.enterprise_id]) {
        etplist[list.enterprise_id] = [];
      }
      etplist[list.enterprise_id].push(list)
    }

    var alllist = [];
    //var price = 0;
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

    // this.Base.setMyData({

    // })

    //return;

    //var json = alllist;
    //console.log(json, "来了")

    var sumprice = 0;

    for (var i = 0; i < alllist.length; i++) {
      var ent = alllist[i].name;
      var aaa = 0;
      for (var j = 0; j < ent.length; j++) {
        // console.log(parseInt(ent[j].price), "||",parseInt (ent[j].qty))
        aaa += parseInt((ent[j].price) * (ent[j].qty));
        //console.log(aaa,"店铺价格")
      }
      alllist[i].pp = aaa;
      sumprice += aaa;
    }

    this.Base.setMyData({
      //arr: json,
      sumprice,
      alllist,
      //price
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
    var that = this;
    var orderapi = new OrderApi();
    var sumprice = this.Base.getMyData().sumprice;
    var arr = this.Base.getMyData().alllist;
    var addressinfo = this.Base.getMyData().addressinfo;
    console.log(this.Base.getMyData().employeeinfo.id, "啦啦啦啦啦啦啦啦");
    // return;
    wx.showModal({
      title: '提交',
      content: '确认提交订单？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {

          for (var i = 0; i < arr.length; i++) {
            var list = {
              orderno: '',
              enterprise_id: arr[i].id,
              employee_id: that.Base.getMyData().employeeinfo.id,
              totalamount: arr[i].pp,
              vin: that.Base.options.vin,
              carname: that.Base.options.carmodel,
              quote_id: that.Base.options.id,
              receiver: addressinfo.name,
              receivecontact: addressinfo.phonenumber,
              receiveaddress: addressinfo.region + addressinfo.address,
              order_status: 'W',
              status: 'A'
            }

            that.submitlist(list, i);



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

      orderapi.settle(json, (settle) => {})

    }, i * 300)
    
    //   wx.hideLoading();
    //   wx.showToast({
    //     title: '订单提交成功',
    //     icon: 'none'
    //   })
    
    wx.navigateTo({
      url: '/pages/waitpay/waitpay?id=' + this.Base.options.id
    })
    // setTimeout(() => {
      
    //   wx.hideLoading();
    //   wx.showToast({
    //     title: '订单提交成功',
    //     icon: 'none'
    //   })
    // }, 1500)

    // wx.navigateTo({
    //   url: '/pages/jiaoyisuccess/jiaoyisuccess'
    // })

 
  }

  bindaddress(e) {
    wx.navigateTo({
      url: '/pages/address/address?ad=1',
      success: function(res) {}
    })
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.bindaddress = content.bindaddress;
body.confirm = content.confirm;

body.submit = content.submit;
body.submitlist = content.submitlist;

body.check = content.check;

Page(body)