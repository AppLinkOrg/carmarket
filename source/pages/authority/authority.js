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
  EnterpriseApi
} from "../../apis/enterprise.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    // super.onLoad(options);
    this.Base.setMyData({
      change: "A"

    });
  }
  onMyShow() {
    var that = this;
    var enterpriseapi = new EnterpriseApi();
    enterpriseapi.allenterprise({
      enterprise_id: this.Base.getMyData().employeeinfo.enterprise.id, position:'C'
    }, (list) => {
      this.Base.setMyData({
        list
      });
    });
 
  }

  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: "我的下级",
    })
  }

  bindchange(e) {
    var changeid = e.currentTarget.dataset.change;
    this.Base.setMyData({
      change: changeid

    });
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindchange = content.bindchange;
Page(body)