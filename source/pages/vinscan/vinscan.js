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
  }
  onMyShow() {
    var that = this;
  }
  take() {
    var that = this;
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {

        wx.showLoading({
          title: '分析中',
        })
        wx.uploadFile({
          url: ApiConfig.GetFileUploadAPI(), //仅为示例，非真实的接口地址
          filePath: res.tempImagePath,
          name: 'file',
          formData: {
            'module': "vincatch",
            "field": "file"
          },
          success: function(res) {
            console.log("takephoto", res);
            var data = res.data
            if (data.substr(0, 7) == "success") {
              data = data.split("|");
              var photo = data[2];
              var url = that.Base.getMyData().uploadpath + "vincatch/" + photo;
              //url ="https://imgsa.baidu.com/exp/w=500/sign=75046cb8f1faaf5184e381bfbc5594ed/960a304e251f95ca6ad75628c5177f3e6709520a.jpg";
              var carapi = new CarApi();
              carapi.aivin({
                imgurl: url
              }, (res) => {

                wx.hideLoading();
                if (res.code == 0) {

                  console.log("vincatch", res);
                  wx.navigateTo({
                    url: '/pages/check/check?vin=' + res.return.vin,
                  })
                }else{
                  that.Base.info("无法识别有效的vin码");
                }

              });

            } else {
              console.error(res.data);
              wx.hideLoading()
              wx.showToast({
                title: '上传失败，请重试',
                icon: 'warn',
                duration: 2000
              })
            }
            //do something
          }
        });

      }
    })

  }
  upload() {
    var that = this;
    this.Base.uploadOneImage("vincatch", (photo) => {

      wx.showLoading({
        title: '分析中',
      })
      var url = that.Base.getMyData().uploadpath + "vincatch/" + photo;

      var carapi = new CarApi();
      carapi.aivin({
        imgurl: url
      }, (res) => {

        wx.hideLoading();
        console.log("vincatch", res);
        if (res.code == 0) {

          console.log("vincatch", res);
          wx.navigateTo({
            url: '/pages/check/check?vin=' + res.return.vin,
          })
        } else {
          that.Base.info("无法识别有效的vin码");
        }

      });
    });
  }
  write(){
    wx.navigateTo({
      url: '/pages/check/check' ,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.take = content.take;
body.upload = content.upload;
body.write = content.write;
Page(body)