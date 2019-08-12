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
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var orderapi = new OrderApi();

    orderapi.detail({
      id:this.Base.options.id
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



  // binddelete() {
  //   var that = this;
  //   this.Base.setMyData({
  //     searchinput: ''
  //   })
  // } 

  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

// body.binddelete = content.binddelete;
Page(body)