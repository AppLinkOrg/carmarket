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

  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '提交订单',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
     //options.id = 11;
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
    var num = 0;
    var orderapi = new OrderApi();
 
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


    orderapi.shopcarlist({
      quote_id: this.Base.options.id,
      status: 'A'
    }, (shopcarlist) => {

      var etplist = {};

      for (var i = 0; i < shopcarlist.length; i++) {
        //shopcarlist[i].check = false;
        if (shopcarlist[i].status == 'A') {
          num++;
          price += (parseFloat(shopcarlist[i].price) * parseFloat(shopcarlist[i].qty))
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
      price = price.toFixed(2)
      this.Base.setMyData({
        shopcarlist,
        alllist,
        num,
        price
      })
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
        orderapi.updateqty({
          type: 'B',
          id: id
        }, (updatecheck) => {
          this.onMyShow();
        })
      } else {
        wx.showToast({
          title: '不能再减少了哦',
          icon: 'none'
        })
      }
    } else {
      orderapi.updateqty({
        type: 'A',
        id: id
      }, (updatecheck) => {
        this.onMyShow();
      })
      //alllist[index].name[idx].qty++
    }


    for (var m = 0; m < alllist.length; m++) {
      var qtylist = alllist[m].name;
      for (var a = 0; a < qtylist.length; a++) {
        if (qtylist[a].status == 'A') {
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

 


  submit(e) {
    var that = this;
    var orderapi = new OrderApi(); 
    var arr = this.Base.getMyData().alllist;
    var addressinfo = this.Base.getMyData().addressinfo;
    var types = this.Base.options.xuan;
console.log(types,'来来来');
    if (types == 'F') {
      var needinvoice = 'N';
    } else {
      var needinvoice = 'Y';
    }
 

    if (addressinfo == undefined) {
      wx.showToast({
        title: '请先选择地址!',
        icon: 'none'
      })
      return;
    }
 
    wx.showModal({
      title: '提交',
      content: '确认提交订单？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {

        //  var employee_id= that.Base.getMyData().employeeinfo.id,
        //    gongsi =  that.Base.getMyData().employeeinfo.id,
        //    vin =  that.Base.options.vin,
        //    carname =  that.Base.options.carmodel,
        //    quote_id =  that.Base.options.id,
        //    receiver =  addressinfo.name,
        //    needinvoice =  needinvoice,
        //    receivecontact =  addressinfo.phonenumber,
        //    receiveaddress =  addressinfo.region + addressinfo.address;

          //  console.log(
          //    employee_id, '/', gongsi, '/', vin, '/', carname, '/', quote_id, '/', receiver, '/', needinvoice, '/', receivecontact, '/', receiveaddress

          //  ) 

          orderapi.createorder({
            employee_id: that.Base.getMyData().employeeinfo.id, 
            gongsi: that.Base.getMyData().employeeinfo.id, 
            vin: that.Base.options.vin,
            // vin: '123456',
            carname: that.Base.options.carmodel,
            // carname: '看六角恐龙',
            quote_id: that.Base.options.id,
            receiver: addressinfo.name,
            needinvoice: needinvoice,
            receivecontact: addressinfo.phonenumber,
            receiveaddress: addressinfo.region + addressinfo.address, 
          }, (createorder) => {
            console.log(createorder);
            that.Base.setMyData({ createorder: createorder})
            // return
            wx.redirectTo({
              url: '/pages/waitpay/waitpay?id=' + that.Base.options.id + '&order_id=' + createorder.return
            })
              // + '&json=' + JSON.stringify(arr)
          })
 
        }
      }
    })

  }

 

  bindaddress(e) {
    wx.navigateTo({
      url: '/pages/address/address?ad=1' 
    })
  }
 

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
// body.bindjiesuan = content.bindjiesuan;
body.bindjisuan = content.bindjisuan;

// body.deleteshop = content.deleteshop; 

body.submit = content.submit;

body.bindaddress = content.bindaddress; 

// body.bindchoose = content.bindchoose;
// body.bindcheck = content.bindcheck;
// body.bindallcheck = content.bindallcheck;
Page(body)