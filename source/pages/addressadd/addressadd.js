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
  AddressApi
} from "../../apis/address.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '地址添加',
    });
  }
  onMyShow() {
    var that = this;
    var addressapi = new AddressApi();


  }

  bindcaocun(e) {
    var addressapi = new AddressApi();
    var id = e.currentTarget.id
    addressapi.addaddress({}, (baocun) => {
      this.Base.setMyData({
        baocun
      });
    });

    wx.navigateBack({
      url: 'pages/address/address?id=' + id,
    })
  }
  binddetele() {
    var addressapi = new AddressApi();
    addressapi.addressdelete({}, (detele) => {
      this.Base.setMyData({
        detele
      });
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcaocun = content.bindcaocun;
body.binddetele = content.binddetele;
Page(body)