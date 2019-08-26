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
    this.Base.setMyData({
      check: 'N',
      id: this.Base.options.id
    })
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '地址添加',
    });
  }
  onMyShow() {
    var that = this;
    var addressapi = new AddressApi();
    if (this.Base.options.id != undefined) {
      addressapi.addressinfo({
        id: this.Base.options.id
      }, (info) => {

        this.Base.setMyData({
          info,

          city: info.region,
          phone: info.phonenumber,
          people: info.name,
          address: info.address,
          check: info.morenaddress_value
        });
      });
    }

  }

  bindman(e) {
    console.log(e.detail.value, "地方")
    this.Base.setMyData({
      people: e.detail.value
    })
  }
  bindphone(e) {
    this.Base.setMyData({
      phone: e.detail.value
    })
  }
  binddizhi(e) {
    this.Base.setMyData({
      dizhi: e.detail.value
    })
  }
  bindxiangxi(e) {
    this.Base.setMyData({
      address: e.detail.value
    })
  }

  bindcheck(e) {
    var checked = e.currentTarget.id;
    if (checked == 'Y') {
      this.Base.setMyData({
        check: 'N'
      })
    }
    if (checked == 'N') {
      this.Base.setMyData({
        check: 'Y'
      })
    }

  }

  bindRegionChange(e) {

    console.log(e);
    var city = e.detail.value[0] + " " + e.detail.value[1] + " " + e.detail.value[2]
    console.log(city);
    // return
    this.Base.setMyData({
      city: city
    })

  }

  bindcaocun(e) {
    var that = this;
    var id = this.Base.options.id;
    console.log(id, "sadfsfasg")

    // return
    var people = this.Base.getMyData().people;
    var phone = this.Base.getMyData().phone;
    var city = this.Base.getMyData().city;
    var address = this.Base.getMyData().address;
    var employeeinfo = this.Base.getMyData().employeeinfo;
    var check = this.Base.getMyData().check

    console.log(people, "收货人", employeeinfo.id);

    if (people == "" || people == undefined) {
      this.Base.toast('请填写收货人');
      return;
    }
    if (phone == "" || "手机号码", phone == undefined) {
      this.Base.toast('请输入手机号码');
      return;
    }
    if (city == "" || "地址", city == undefined) {
      this.Base.toast('请选择地区');
      return
    }
    if (address == "" || "详细地址", address == undefined) {
      this.Base.toast('请输入详细的地址');
      return
    }

    wx.showModal({
      title: '提示',
      content: '是否保存该地址',
      confirmText: "确认",
      success: function(res) {
        if (res.confirm) {

          if (id != undefined) {

            var addressapi = new AddressApi();

            addressapi.updateaddress({
              id: that.Base.options.id,
              name: people,
              phonenumber: phone,
              region: city,
              address: address,
              morenaddress: check
            }, (edit) => {
              that.Base.setMyData({
                edit
              });
            });
          } else {

            var addressapi = new AddressApi();
            addressapi.addaddress({
              name: people,
              phonenumber: phone,
              region: city,
              address: address,
              morenaddress: check

            }, (baocun) => {
              that.Base.setMyData({
                baocun
              });

            });
          }
          wx.navigateBack({

          })

        } else {

        }
      }
    })


    // if (id != undefined) {
    //   var addressapi = new AddressApi();

    //   addressapi.updateaddress({
    //     id: this.Base.options.id,
    //     name: people,
    //     phonenumber: phone,
    //     region: city,
    //     address: address,
    //     morenaddress: check
    //   }, (edit) => {
    //     this.Base.setMyData({
    //       edit
    //     });
    //   });
    // } else {

    //   var addressapi = new AddressApi();
    //   addressapi.addaddress({
    //     name: people,
    //     phonenumber: phone,
    //     region: city,
    //     address: address,
    //     morenaddress: check
    //   }, (baocun) => {
    //     this.Base.setMyData({
    //       baocun
    //     });
    //   });
    // }
    // wx.navigateBack({
    // })

  }
  binddetele() {


    var id = this.Base.options.id;

    var addressapi = new AddressApi();
    wx.showModal({
      title: '提示',
      content: '是否删除该地址',
      confirmText: "确认",
      success: function(res) {
        if (res.confirm) {
          addressapi.addressdelete({
            id: id,
          }, (detele) => {
            // this.Base.setMyData({
            //   detele
            // });
            wx.navigateBack({

            })
          });
        } else {
        }
      }
    })
  }
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcaocun = content.bindcaocun;
body.binddetele = content.binddetele;
body.bindman = content.bindman;
body.bindphone = content.bindphone;
body.binddizhi = content.binddizhi;
body.bindxiangxi = content.bindxiangxi;
body.changeIndicatorDots = content.changeIndicatorDots;
body.bindRegionChange = content.bindRegionChange;

body.bindcheck = content.bindcheck;

Page(body)