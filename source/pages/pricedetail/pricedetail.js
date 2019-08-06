// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CarApi} from "../../apis/car.api.js";


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
    var carapi = new CarApi();

    carapi.searchhistory({}, (searchhistory) => {
      this.Base.setMyData({
        searchhistory
      });
    });
 
  }

  setPageTitle(instinfo) {
    var title = "车架号查询";
    wx.setNavigationBarTitle({
      title: title,
    })
  }



  bindcemra(){
    var that = this;
    this.Base.takeImage("product", (ret) => {
      var images = that.Base.getMyData().images;
      images.push(ret);
      that.Base.setMyData({
        images
      });
    });
  }

  binddelete() {
    var that = this;
    this.Base.setMyData({
      searchinput: ''
    })
  } 

  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcemra = content.bindcemra;
body.binddelete = content.binddelete;
Page(body)