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
    var today = (new Date()).getTime();

    orderapi.detail({
      id: this.Base.options.id,
     // id: 1,
    }, (yiwancheng) => {
      // this.Base.setMyData({
      //   yiwancheng, orderlijian: yiwancheng.orderitem
      // });
      var fintime = new Date(yiwancheng.order_time).getTime();
      if (yiwancheng.order_status == 'N' && today - fintime>90*24*60*60*1000){
        var nottui = true;
      }else {
        var nottui = false;
      }
      this.Base.setMyData({ nottui});
      
      this.getreturn(yiwancheng.orderitem, yiwancheng);
    });
  }

  getreturn(orderlijian, yiwancheng){
    var orderapi = new OrderApi();
    console.log(orderlijian,'orderlijian');
    // var yiwancheng=this.Base.getMyData().yiwancheng;
    var lijian = [];
    var yiquantuohuo = false;
    var weiquantuohuo = false;
    orderapi.returnlist({ order_id: this.Base.options.id }, (returndetail)=>{
      console.log(returndetail,'getreturn');
      if (returndetail.length>0){
        returndetail.filter((item) => {
          // lijian = item.returnitem;
          for (var e = 0; e < item.returnitem.length; e++) {
            lijian.push(item.returnitem[e])
          }

        })
       
        if (orderlijian.length <= lijian.length) {
          yiquantuohuo = true;
        }
        if (orderlijian.length > lijian.length) {
          weiquantuohuo = false;
        
        }
        if(lijian.length>0){
          for (var i = 0; i < orderlijian.length; i++) {
            for (var j = 0; j < lijian.length; j++) {
              if (orderlijian[i].parts == lijian[j].name) {
                yiwancheng.orderitem[i].tui = true
              }
            }
          }
        }
          
        this.Base.setMyData({ lijian, yiquantuohuo, weiquantuohuo,yiwancheng })


      }else {
        this.Base.setMyData({
          weiquantuohuo:false,
          yiwancheng,
          yiquantuohuo
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