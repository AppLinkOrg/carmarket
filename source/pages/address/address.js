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
  onMyShow() {
    var that = this;
    var addressapi = new AddressApi();
    addressapi.addresslist({ 
    }, (addresslist) => {
      this.Base.setMyData({
        addresslist
      })
    })
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '我的地址',
    });
  }
  bindaddressadd() {
    wx.navigateTo({
      url: '/pages/addressadd/addressadd',
    })
  }


  bindedit(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/addressadd/addressadd?id=' + id,
    })
  }

  bindchuandizhi(e) {
  console.log(1111111)
    if(this.Base.options.ad!=undefined){
      var id = e.currentTarget.id;
      var addressapi = new AddressApi();
      addressapi.addressinfo({
        id: id
      }, (addressinfo) => {

        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面

        //不需要页面更新
        prevPage.setData({
          info: addressinfo
        })

        wx.navigateBack({

        })

      })
    }
  
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindaddressadd = content.bindaddressadd;
body.bindedit = content.bindedit;
body.bindchuandizhi = content.bindchuandizhi;
Page(body)