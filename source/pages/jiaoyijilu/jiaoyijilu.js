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
     var type=[
       { id: 1, name: '全部' },
       { id: 2, name: '已完成' },
       { id: 3, name: '已退货' },
     ];
     this.Base.setMyData({type,seq:0})
  }

  onMyShow() {
    var that = this;
    var id = this.Base.options.id;
    var orderApi = new OrderApi();
    var seq = this.Base.getMyData().seq;
    orderApi.consumelist({
      employee_id: that.Base.getMyData().employeeinfo.id,
      orderby:'r_main.consume_time desc'

    }, (list) => {
      console.log(list, 'ooooo')
      var templist=[];
      templist=list;
      var ss=[];
      for (var i = 0; i < templist.length;i++){
        templist[i].consume_time1 = that.changedate(templist[i].consume_time);
        templist[i].consume_time2 = that.changetime(templist[i].consume_time);
        // if(seq==1){
        //   if (templist[i].type == 'G') {
        //     ss.push(templist[i]);
        //   }
        // }else if(seq==2){
        //   if (templist[i].type == 'R') {
        //     ss.push(templist[i]);
        //   }
        // }else {
        //   ss.push(templist[i]);
        // }
        
      }
      this.Base.setMyData({
        list: templist, templist
      });
    });
  }

  changedate(date){
    date = date.replace(/-/g,'/');
    date = date.slice(2,10);
    return date
  }

  changetime(date) {
    date = date.replace(/-/g, '/');
    date = date.slice(11, date.length - 3);
    return date
  }

  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: "我的账户",
    })
  }
  todetails(e) {
      console.log(e)
      var type=e.currentTarget.dataset.type.type;
      // return
      if(type=='G'){
        wx.navigateTo({
          url: '/pages/success/success?id=' + e.currentTarget.id,

        })
      }else {
        wx.navigateTo({
          url: '/pages/changedetail/changedetail?order_id=' + e.currentTarget.id,

        })
      }
    
  }
  qiehuan(e){
    var cur = e.currentTarget.dataset.idx;
    var templist = this.Base.getMyData().templist;
    var list=[];
    if(cur==1){
      for(var i=0;i<templist.length;i++){
        if (templist[i].type=='R'){
          list.push(templist[i])
        }
      }
    }else if(cur==2){
      for (var i = 0; i < templist.length; i++) {
        if (templist[i].type == 'G') {
          list.push(templist[i])
        }
      }
    }else{
      list=templist;
    }
    console.log(e)
    this.Base.setMyData({
      seq:cur,list
    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.todetails = content.todetails;
body.qiehuan = content.qiehuan;
body.changetime = content.changetime;
body.changedate = content.changedate;
Page(body)