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
    //options.id=5;
     super.onLoad(options);
    var type = [
      { id: 1, name: '已完成' },
      { id: 2, name: '已退货' },
    ];
    this.Base.setMyData({ type, seq: 0 })
  }

  onMyShow() {
    var that = this;
    var orderApi = new OrderApi();
    orderApi.consumelist({
      enterprise_id: that.Base.getMyData().employeeinfo.enterprise.id,
      orderby: 'r_main.consume_time desc'
    }, (list) => {
      console.log(list,'ooooo');
      var templist = [];
      templist = list;
      var ss = [];
      for (var i = 0; i < templist.length; i++) {
        // templist[i].consume_time = that.changetime(templist[i].consume_time);
        if (templist[i].type == 'G') {
          ss.push(templist[i]);
        }
      }
      this.Base.setMyData({
        list: ss, templist
      });
    });
  }
  
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: "我的账户",
    })
  }
  todetails(e){
    wx.navigateTo({
      url: '/pages/success/success?id='+e.currentTarget.id,
      
    })
  }

  qiehuan(e) {
    var cur = e.currentTarget.dataset.idx;
    var templist = this.Base.getMyData().templist;
    var list = [];
    if (cur == 1) {
      for (var i = 0; i < templist.length; i++) {
        if (templist[i].type == 'R') {
          list.push(templist[i])
        }
      }
    } else {
      for (var i = 0; i < templist.length; i++) {
        if (templist[i].type == 'G') {
          list.push(templist[i])
        }
      }
    }
    console.log(e)
    this.Base.setMyData({
      seq: cur, list
    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.todetails = content.todetails;
body.qiehuan = content.qiehuan;
Page(body)