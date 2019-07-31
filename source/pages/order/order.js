// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

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

    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    
  }


  bindorder(e) {
    var orderid = e.currentTarget.dataset.order;
    console.log(orderid, "选中的节点值");
    this.Base.setMyData({
      order: orderid
    });
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindorder = content.bindorder;
Page(body)