// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CarApi} from "../../apis/car.api.js";
import { OrderApi } from "../../apis/order.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      xuan: 'F',
      chakan:'C'
    })
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var orderapi = new OrderApi();
    var id = this.Base.options.id;

    orderapi.detail({
      id:id
    }, (searchhistory) => {
      this.Base.setMyData({
        searchhistory
      });
    });
 
  }

  setPageTitle(instinfo) {
    var title = "待报价";
    wx.setNavigationBarTitle({
      title: title,
    })
  }
  bindchakan(e){
    var chakan = e.currentTarget.dataset.chakan;
    this.Base.setMyData({
      chakan:chakan
    })

  }
  bindfapiao(e){
    var xuan = e.currentTarget.id
    if(xuan=='S'){
      this.Base.setMyData({
        xuan:'F'
      })
    }
    if(xuan=='F'){
      this.Base.setMyData({
        xuan:'S'
      })
    }
  }
  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.bindfapiao = content.bindfapiao;
body.bindchakan = content.bindchakan;
Page(body)