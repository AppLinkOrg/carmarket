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
    this.Base.setMyData({
      change: "A"

    });
  }
  onMyShow() {
    var that = this;
  }




  bindchange(e){
    var changeid = e.currentTarget.dataset.change;
    this.Base.setMyData({
      change:changeid

    });
    
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindchange = content.bindchange; 
Page(body)