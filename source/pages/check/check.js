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
      // brandCode:this.Base.options.brandCode,
       mcid:this.Base.options.mcid,
       biaoti:this.Base.options.biaoti,
    //  addlist:[] 
    })
    if (this.Base.getMyData().json != undefined) {
      console.log('看两节课靠家里')
      var addlist = JSON.parse(this.Base.getMyData().json);
      this.Base.setMyData({ addlist })
    } else {
      console.log('来看看了')
      this.Base.setMyData({ addlist: [] })
    }


    this.bindpart();

  }
  onMyShow() {
    var that = this;
    var carapi = new CarApi();
     



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
  bindpart(e) {
    console.log(e,"输出")
    // this.Base.setMyData({
    //   search_key: e.detail.value
    // })
    var carapi = new CarApi();
    // var search_key = e.detail.value;
    // var vin = this.Base.getMyData().vin;
    // var brandCode = this.Base.getMyData().brandCode
    // var mcid = this.Base.getMyData().mcid;

   // console.log(search_key, vin, brandCode, mcid)
    //return;

    carapi.groups({
      vin:'LVSHGFAR3DF071861',
      brandCode:'volvos',
      mcid:'ZD18dns9JT89LC4sQC4pLS09Yg%3D%3D',
      search_key:'发动机'
    }, (groups) =>{
      var groulist = groups.data;
      for (var i = 0; i < groulist.length;i++){
        groulist[i].check=true;
      }
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

  bindclear(e){
   var id=e.currentTarget.id;
   var addlist = this.Base.getMyData().addlist;
   var index = e.currentTarget.dataset.index; 
   var groupslist = this.Base.getMyData().groupslist;

    console.log(id, "来来来",index);
   //return;
    addlist.splice(index, 1);
    groupslist[id].check = true;
    this.Base.setMyData({ addlist, groupslist })
  }
 

  bindadd(e){
    var that=this;
    var idx = e.currentTarget.id;
    var name = e.currentTarget.dataset.name; 
    var groupslist = this.Base.getMyData().groupslist;
    
   // if (this.Base.getMyData().json != undefined){
    //  var addlist = JSON.parse(this.Base.getMyData().json);
      //console.log(addlist, "new");
  //  } else{
      var addlist = this.Base.getMyData().addlist; 
    //}
//return;
    groupslist[idx].check = false;

    var list={
      id: idx,
      name: name,
      num:1,
      beizhu: '', 
      photo: ''
    };
 
    console.log(idx, "设置的顺序");

    addlist.push(list)
    this.Base.setMyData({ addlist, groupslist})
  }

  bindnext() {
    var that=this;
    var addlist = this.Base.getMyData().addlist;
    var vin = this.Base.options.vin,
      biaoti= this.Base.options.biaoti
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
 

body.bindadd = content.bindadd; 

body.bindclear = content.bindclear; 
Page(body) 