// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '帮助反馈',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    
  }
  bindinput(e){
  this.Base.setMyData({content:e.detail.value})
  }
  submit(e){
    var content=this.Base.getMyData().content;
    var memberapi = new MemberApi();
    memberapi.addfankui({
      employee_id:this.Base.getMyData().employeeinfo.id,
      content: content,
      status:'A'
    }, (addfankui) => {
      if(addfankui.code=='0'){
        this.Base.toast('反馈成功');
        setTimeout(()=>{
          wx.navigateBack({
            
          })
        }, 2000)
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 

body.bindinput = content.bindinput; 
body.submit = content.submit; 
Page(body)