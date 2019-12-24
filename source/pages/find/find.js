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
  CarApi
} from "../../apis/car.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({count:0})
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '找零件',
    });
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var carapi = new CarApi();
    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({
        indexbanner
      });
    });

    carapi.searchhistory({}, (searchhistory) => {
      this.Base.setMyData({
        searchhistory
      });
    });
  
  }



  bindvalue(e) {
   
    //var uppercase = (e.detail.value).toUpperCase();
    // console.log(uppercase);
    //return;

    this.Base.setMyData({
      vin: (e.detail.value).toUpperCase(), count: e.detail.cursor
    })

  }

  bindsearch(e) {
    var that = this;
    var vin = this.Base.getMyData().vin;
    var carapi = new CarApi();
    carapi.vin({
      vin: vin
    }, (res) => {

      console.log(res,'嗷嗷嗷');

      if (res.code == '4001' || res.code == 4001 ){
           wx.showToast({
             title: '无法识别该车架号,请用(无识别查找)',
             icon:'none'
           })
        return;
      }
      if (res.code == 400) {
        wx.showToast({
          title: '暂时无法识别,请用(无识别查找)',
          icon: 'none'
        })
        return;
      }
      var vin = res.data.vin,
        brandCode = res.data.brandCode,
        mcid = res.data.mcid,
        biaoti = res.title[0] + res.title[1] + res.title[2] + res.title[3] + res.title[4]
      if (res.code == 0) {
        that.Base.info(res.msg);
        return;
      }
      if (res.code == 1) {
        carapi.addhistory({
          vin: vin,
          carrecord: biaoti
        }, (qwe) => {
          wx.navigateTo({
            url: '/pages/check/check?vin=' + vin + '&biaoti=' + biaoti + '&brandCode=' + brandCode + '&mcid=' + mcid,
          })
          that.onMyShow();
        })
      }
    })

  }


  bindclear() {
    var that = this;
    var carapi = new CarApi();
    wx.showModal({
      title: '提示',
      content: '是否全部清空',
      confirmText: "确认",
      success: function(res) {
        if (res.confirm) {
          carapi.clearallsearch({ employee_id:that.Base.getMyData().employeeinfo.id}, (clearallsearch) => {
            console.log(clearallsearch);
            that.onMyShow();
          });
        }  

      }
    })
  }

  bindcheck(e) {
    var that = this;
    var vin = e.currentTarget.id;
    console.log(vin,"来了")
   // return;
    var carapi = new CarApi();
    carapi.vin({
      vin: vin
    }, (res) => {
      var vin = res.data.vin,
        brandCode = res.data.brandCode,
        mcid = res.data.mcid,
        biaoti = res.title[0] + res.title[1] + res.title[2] + res.title[3] + res.title[4]
      if (res.code == 0) {
        that.Base.info(res.msg);
        return;
      }
      if (res.code == 400) {
        wx.showToast({
          title: '暂时无法识别,请用(无识别查找)',
          icon: 'none'
        })
        return;
      }
      if (res.code == 1) {
        wx.navigateTo({
          url: '/pages/check/check?vin=' + vin + '&biaoti=' + biaoti + '&brandCode=' + brandCode + '&mcid=' + mcid,
        })
        that.onMyShow();
      }
      
    })
 
  }
  bindunable() {
    wx.navigateTo({
      url: '/pages/unserch/unserch'
    })
  }


  clickvin() {
    // var that = this;
    // this.Base.takeImage("product", (ret) => {
    //   var images = that.Base.getMyData().images;
    //   images.push(ret);
    //   that.Base.setMyData({
    //     images
    //   });
    // });
    wx.navigateTo({
      url: '/pages/vinscan/vinscan',
    })
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.clickvin = content.clickvin;
body.bindclear = content.bindclear;
body.bindcheck = content.bindcheck;
body.bindunable = content.bindunable;
body.bindsearch = content.bindsearch;
body.bindvalue = content.bindvalue;
Page(body)