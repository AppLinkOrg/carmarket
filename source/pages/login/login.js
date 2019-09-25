// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { EnterpriseApi } from "../../apis/enterprise.api.js";

class Content extends AppBase {
  constructor() {
    super();
    this.needauth=false;
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
  }

  bindagree(e){
    wx.redirectTo({
      url: '/pages/agreement/agreement',
    })
  }
 

  bindlogin(e){
    // wx.switchTab({
    //   url: '/pages/find/find',
    // })
    console.log(e);
    var mobile = e.detail.value.mobile;
    var password = e.detail.value.password;
    var api = new EnterpriseApi();
    api.employeelogin({ 
      mobile, 
      password
      },(res)=>{
      console.log(res);
      if(res.code==0){

        wx.setStorageSync("token", res.return);

        wx.reLaunch({
          url: '/pages/find/find',
        })

      }else{
        this.Base.info("用户名或密码不存在");
      }
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindlogin = content.bindlogin;
body.bindagree = content.bindagree;
Page(body)