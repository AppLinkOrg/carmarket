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
  CarApi
} from "../../apis/car.api.js";
import {
  OrderApi
} from "../../apis/order.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      check: "A",
    });
    console.log("a");
  }
  setPageTitle(instinfo) {
    var title = "报价中心";
    wx.setNavigationBarTitle({
      title: title,
    })
  }
  onMyShow() {
    var that = this;
    var orderapi = new OrderApi();
    orderapi.mylist({
      status: 'A',
    }, (mylist) => {
      this.Base.setMyData({
        mylist
      })
    })
    orderapi.mylist({
      status: 'B',

    }, (pricede) => {
      this.Base.setMyData({
        pricede
      })
    })
    orderapi.mylist({
      status: 'E',

    }, (poor) => {
      this.Base.setMyData({
        poor
      })
    })

  }
  
  pricedetail(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/pricedetail/pricedetail?id=' + id,
    })
  }


  bindpricing(e) {
    console.log(e)
    var id = e.currentTarget.id;
    console.log(id);
   // return;
    wx.navigateTo({
      url: '/pages/pricingdetail/pricingdetail?id=' + id ,
    })
  }


  bindtrue(e) {
    var queren = e.currentTarget.queren;
    wx.navigateTo({
      url: '/pages/pricing/pricing?queren=' + queren,
    })
  }

  bindquxiao(e) {
    var id = e.currentTarget.id
    console.log(id,"ggg")
   // return
    var orderapi = new OrderApi();
    orderapi.updatestatus({
      order_id: id,
      status: "E"
      
    }, (myd) => {
      this.Base.setMyData({
        myd
      })
    })
  }
 
  bindshanchu(e){
    var id = e.currentTarget.id
    var orderapi = new OrderApi();
    wx.showModal({
      title: '提示',
      content: '是否删除该报价单',
      confirmText: "确认",
      success: function (res) {
        if (res.confirm) {
          orderapi.updatestatus({
            order_id: id,
            status: "C"
          }, (detele) => {
           
          this.Base.setMyData({
            detele
          })
          });
         
        } else {
          
        }
      }
    })
  }
     


  bindcheck(e) {
    var checkid = e.currentTarget.dataset.check;
    console.log(checkid, "选中的节点值");
    // return;
    this.Base.setMyData({
      check: checkid
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.pricedetail = content.pricedetail;
body.bindpricing = content.bindpricing;
body.bindcheck = content.bindcheck;
body.bindtrue = content.bindtrue;
body.bindquxiao = content.bindquxiao; 
body.bindshanchu = content.bindshanchu;
Page(body)