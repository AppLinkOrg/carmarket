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
    this.Base.setMyData({
      vin:this.Base.options.vin,
      b: this.Base.options.brandCode,
      c: this.Base.options.mcid,
    });
    console.log(this.Base.getMyData().vin, this.Base.getMyData().b,this.Base.getMyData().c,"传入的参数")
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();

  }
  binpart(e) {
    console.log(e);
    this.Base.setMyData({
      part: e.detail.value
    });

    var carapi = new CarApi();
    var search_key = e.detail.value;
    var vin = this.Base.getMyData().vin;
    var brandCode = this.Base.getMyData().b;
    var mcid = this.Base.getMyData().c;
    console.log("mcidearch_key");


    // return;
    carapi.partsearch({ vin: vin, brandCode: brandCode, mcid: mcid, search_key: search_key}, (partsearch) => {
      this.Base.setMyData({
        partsearch
      });
    });

     
  }




  setPageTitle(instinfo) {
    var title = "配件查询";
    wx.setNavigationBarTitle({
      title: title,
    })
  }

  binddelete() {
    var that = this;
    this.Base.setMyData({
      searchinput: ''
    })
  }

  addclick() {
    
    var carapi = new CarApi();

    var vin= this.Base.getMyData().vin;
    var brandCode= this.Base.getMyData().b;
    var mcid = this.Base.getMyData().c;
    console.log("mcidearch_key");
    

   // return;


   // vin = LVSHFCAC2FH007377 & brandCode=ford & mcid=ZD18dns9JT89XFpbQFxRPWI % 3D
    wx.navigateTo({
      url: '/pages/serchgo/serchgo',
    })

  }

  


} 
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.addclick = content.addclick;
body.binddelete = content.binddelete;
body.binpartsearch = content.binpartsearch;
body.binpart = content.binpart;

Page(body)