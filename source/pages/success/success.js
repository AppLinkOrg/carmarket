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
    //options.id=1;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var orderapi = new OrderApi();
 
    orderapi.detail({
      id: this.Base.options.id,
     // id: 1,
    }, (yiwancheng) => {
      this.Base.setMyData({
        yiwancheng, orderlijian: yiwancheng.orderitem
      });
      this.getreturn(yiwancheng.orderitem, yiwancheng);
    });
  }

  getreturn(orderlijian, yiwancheng){
    var orderapi = new OrderApi();
    console.log(orderlijian,'orderlijian');
    // var yiwancheng=this.Base.getMyData().yiwancheng;
    var lijian = [];
    orderapi.returnlist({ order_id: this.Base.options.id }, (returndetail)=>{
      console.log(returndetail,'getreturn');
      if (returndetail.length>0){
        returndetail.filter((item) => {
          lijian = item.returnitem;
          
        })


        if (orderlijian.length == lijian.length) {
          var yiquantuohuo = true;
        }
        if (orderlijian.length > lijian.length) {
          var weiquantuohuo = false;
          // for (var i = 0; i < orderlijian.length; i++) {
          //   for (var j = 0; j < lijian.length; j++) {
          //     if (orderlijian[i].parts == lijian[j].name) {
          //       yiwancheng.orderitem.splice(i, 1);
          //     }
          //   }
          // }
        }
        this.Base.setMyData({ lijian, yiquantuohuo, weiquantuohuo })


      }else {
        this.Base.setMyData({
          weiquantuohuo:false,
          
        })
      }
      
      
    })

  }

  bindapply(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/changeapply/changeapply?id=' + id,
    })
  }


  setPageTitle(instinfo) {
    var title = "订单详情";
    wx.setNavigationBarTitle({
      title: title,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindapply = content.bindapply;
body.getreturn = content.getreturn;
Page(body)