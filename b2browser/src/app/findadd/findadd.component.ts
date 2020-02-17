import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
import { CarApi } from 'src/providers/car.api';

@Component({
  selector: 'app-findadd',
  templateUrl: './findadd.component.html',
  styleUrls: ['./findadd.component.scss'],
  providers: [CarApi]
})
export class FindaddComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public enterpriseApi: EnterpriseApi,
    public orderApi: OrderApi,
    public carApi: CarApi
  ) {
    super(router, activeRoute, instApi, orderApi, enterpriseApi);
  }
  vin = null;
  biaoti = null;
  brandCode = null;
  mcid = null;
  neiron = null;
  groupslist = [];
  addlist = [];
  onMyLoad() {
    this.vin = this.params.vin;
    this.biaoti = this.params.biaoti;
    this.brandCode = this.params.brandCode;
    this.mcid = this.params.mcid;
  }
  onMyShow() {

    console.log(this.params.vin, '---', this.params.biaoti, '---', this.params.brandCode, '---', this.params.mcid)
  }

  bindpart(e) {
    console.log(e, "输出")

    var search_key = this.neiron;
    var vin = this.vin;
    var brandCode = this.brandCode
    var mcid = this.mcid;

    console.log(search_key, '一号');
    console.log(vin, '二号');
    console.log(brandCode, '三号');
    console.log(mcid, '四号');
    //return;
    // console.log(search_key, vin, brandCode, mcid)
    //return;

    this.carApi.partsearch({
      vin: vin,
      brandCode: brandCode,
      mcid: mcid,
      search_key: search_key
    }).then((groups: any) => {
      var groupslist = [];
      var list = {
        label: search_key,
        sale_price: '',
        mill: '',
        parttype: '',
        pid: '',
        check: true
      };
      if (groups.data.length == 0) {
        groupslist.push(list);
        console.log(groupslist, '理论')
        this.groupslist = groupslist;
      } else {

        var groulist = groups.data;
        for (var i = 0; i < groulist.length; i++) {
          groulist[i].check = true;
        }

        this.groupslist = groups.data;

      }


      console.log(this.groupslist, '渣渣')


    })

  }

  bindadd(idx, img, mid, name) {

    console.log(idx, '--');
    console.log(img, '--');
    console.log(mid, '--');
    console.log(name, '--')
    var groupslist = this.groupslist;
    var addlist = this.addlist;
    // return;

    // if (this.Base.getMyData().json != undefined){
    //  var addlist = JSON.parse(this.Base.getMyData().json);
    //console.log(addlist, "new");
    //  } else{
    //var addlist = this.Base.getMyData().addlist;
    //}
    //return;

    this.carApi.selectprice({
      pid: mid,
      brandCode: this.brandCode
    }).then((ret: any) => {

      console.log(ret.data[0], ret, '领了')

      groupslist[idx].check = false;

      if (ret.code == 0) {
        // var list = {
        //   id: idx,
        //   name: name,
        //   num: 1,
        //   img: img,
        //   brandCode: this.brandCode,
        //   cost_price: 0,      //销售价
        //   mill: '',      //厂商
        //   parttype: '',    //零件类型
        //   mid: '',       //零件号
        //   beizhu: '',
        //   photo: ''
        // };
         
      } else {
        var list = {
          id: idx,
          name: name,
          num: 1,
          img: img,
          brandCode: this.brandCode,
          cost_price: ret.data[0].sale_price,      //销售价
          mill: ret.data[0].mill,      //厂商
          parttype: ret.data[0].parttype,    //零件类型
          mid: mid,       //零件号
          beizhu: '',
          photo: ''
        };
      }

      console.log(idx, "设置的顺序");

      addlist.push(list);

      this.addlist = addlist;
      this.groupslist == groupslist;

      console.log(addlist,'第一个列表')

      console.log(groupslist,'第二个列表')

    })



  }

  bindclear(i,id) {
    var id = id;
    var addlist = this.addlist;
    var index = i;
    var groupslist = this.groupslist;

    console.log(id, "来来来", index);
    //return;
    addlist.splice(index, 1);
    groupslist[id].check = true;
    this.addlist=addlist;
    this.groupslist=groupslist;
    
  }

  bindnext(){
    var ss=JSON.stringify(this.addlist);
    console.log(ss,'json列表')
    this.navigate('submitpage',{ss:ss})
  }


}
