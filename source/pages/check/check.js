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
   // options.id = 5;
    super.onLoad(options);

    this.Base.setMyData({
 
      vin: this.Base.options.vin,
      brandCode: this.Base.options.brandCode,
      mcid: this.Base.options.mcid,
      biaoti: this.Base.options.biaoti,
 
    })


    //this.bindpart();

  }

  onMyShow() {
    var that = this;
    var carapi = new CarApi();

    if (this.Base.getMyData().json != undefined) {
      console.log('看两节课靠家里')
      var addlist = JSON.parse(this.Base.getMyData().json);
      var select = this.Base.getMyData().check;

 
      this.Base.setMyData({
        addlist: addlist
      })

    } else {
      console.log('来看看了')
      this.Base.setMyData({
        addlist: []
      })
    }

    // carapi.searchhistory({}, (searchhistory) => {
    //   this.Base.setMyData({
    //     searchhistory
    //   })
    // })

    // carapi.addhistory({}, (addhistory) => {
    //   this.Base.setMyData({
    //     addhistory
    //   })
    // })


  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '添加配件',
    })
  }
  bindinput(e) {
    this.Base.setMyData({
      search_key: e.detail.value
    })
  }
  bindpart(e) {
    console.log(e, "输出")
    wx.showLoading({
      title: '搜索中...',
    })
    var carapi = new CarApi();
    var search_key = e.detail.value;
    var vin = this.Base.getMyData().vin;
    var brandCode = this.Base.getMyData().brandCode
    var mcid = this.Base.getMyData().mcid;

    // console.log(search_key, vin, brandCode, mcid)
    //return;

    carapi.partsearch({
      vin: vin,
      brandCode: brandCode,
      mcid: mcid,
      search_key: search_key
    }, (groups) => {
      var groulist = groups.data;
      for (var i = 0; i < groulist.length; i++) {
        groulist[i].check = true;
      }
      wx.hideLoading();
      this.Base.setMyData({
        groupslist: groups.data
      })
    })

  }
  binddelect() {
    var that = this;
    this.Base.setMyData({
      partinput: ''
    })
  }

  bindclear(e) {
    var id = e.currentTarget.id;
    var addlist = this.Base.getMyData().addlist;
    var index = e.currentTarget.dataset.index;
    var groupslist = this.Base.getMyData().groupslist;

    console.log(id, "来来来", index);
    //return;
    addlist.splice(index, 1);
    groupslist[id].check = true;
    this.Base.setMyData({
      addlist,
      groupslist
    })
  }


  bindadd(e) {
    var that = this;
    var idx = e.currentTarget.id;
    var name = e.currentTarget.dataset.name;
    var img = e.currentTarget.dataset.img;
    var mid = e.currentTarget.dataset.mid;
    var groupslist = this.Base.getMyData().groupslist;

    // if (this.Base.getMyData().json != undefined){
    //  var addlist = JSON.parse(this.Base.getMyData().json);
    //console.log(addlist, "new");
    //  } else{
    var addlist = this.Base.getMyData().addlist;
    //}
    //return;

    var carapi = new CarApi();
    carapi.selectprice({
      pid: mid,
      brandCode: this.Base.getMyData().brandCode
    }, (ret) => {

      console.log(ret.data[0])
 
      groupslist[idx].check = false;

      var list = {
        id: idx,
        name: name,
        num: 1,
        img: img,
        brandCode: this.Base.getMyData().brandCode,
        cost_price: ret.data[0].sale_price,      //销售价
        mill: ret.data[0].mill,      //厂商
        parttype: ret.data[0].parttype,    //零件类型
        mid: mid,       //零件号
        beizhu: '',
        photo: ''
      };

      console.log(idx, "设置的顺序");

      addlist.push(list)
      this.Base.setMyData({
        addlist,
        groupslist
        //aaaa: ret
      })
 
    })
  

  }

  bindnext() {
    var that = this;
    var addlist = this.Base.getMyData().addlist;
    var vin = this.Base.options.vin,
      biaoti = this.Base.options.biaoti
    // var groupslist = this.Base.getMyData().groupslist;
    wx.navigateTo({
      url: '/pages/findadd/findadd?json=' + JSON.stringify(this.Base.getMyData().addlist) + '&biaoti=' + biaoti + '&vin=' + vin
      // success: function (res) {

      //   for (var i = 0; i < groupslist.length; i++) {
      //     groupslist[i].check = true;
      //   }

      //   that.Base.setMyData({ addlist: [], groupslist})
      // }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindpart = content.bindpart;
body.binddelect = content.binddelect;
body.bindnext = content.bindnext;

body.bindinput = content.bindinput;
body.bindadd = content.bindadd;

body.bindclear = content.bindclear;
Page(body)