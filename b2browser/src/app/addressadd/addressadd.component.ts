import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
import { AddressApi } from 'src/providers/address.api';

@Component({
  selector: 'app-addressadd',
  templateUrl: './addressadd.component.html',
  styleUrls: ['./addressadd.component.scss'],
  providers:[InstApi,EnterpriseApi,AddressApi]
})
export class AddressaddComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
    public addressapi:AddressApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }

    check= 'N';
    id='';
    info={};
    city='';
    phone="";
    people="";
    address=""
  onMyShow(){
    var that = this;
      this.id = this.params.id;
      if (this.params.id != undefined) {
        this.addressapi.addressinfo({
          id: this.params.id
        }).then( (info:any) => {
          console.log(info,'adinfo')
          // this.Base.setMyData({
            this.info=info;
            this.city=info.region,
            this.phone=info.phonenumber,
            this.people= info.name,
            this.address= info.address,
            this.check= info.morenaddress_value
          // });
        });
      }
  
  }



  bindcheck(e) {
    // var checked = e.currentTarget.id;
    if (e == 'Y') {
      // this.Base.setMyData({
        this.check= 'N'
      // })
    }
    if (e == 'N') {
      // this.Base.setMyData({
        this.check='Y'
      // })
    }

  }

  bindRegionChange(e) {

    // console.log(e);
    // var city = e.detail.value[0] + " " + e.detail.value[1] + " " + e.detail.value[2]
    // console.log(city);
    // // return
    // this.Base.setMyData({
    //   city: city
    // })

  }

  bindcaocun() {
    var that = this;
    // var id = this.Base.options.id;
    console.log(this.id, "sadfsfasg")

    // return
    // var people = this.Base.getMyData().people;
    // var phone = this.Base.getMyData().phone;
    // var city = this.Base.getMyData().city;
    // var address = this.Base.getMyData().address;
    // var employeeinfo = this.Base.getMyData().employeeinfo;
    // var check = this.Base.getMyData().check

    // console.log(people, "收货人", employeeinfo.id);

    if (this.people == "" || this.people == undefined) {
      // this.Base.toast('请填写收货人');
      return;
    }
    if (this.phone == "" || "手机号码", this.phone == undefined) {
      // this.Base.toast('请输入手机号码');
      return;
    } else if (this.phone.length != 11) {
      // this.Base.toast('请输入11位手机号码')
      return;
    }
    if (this.city == "" || "地址", this.city == undefined) {
      // this.Base.toast('请选择地区');
      return
    }
    if (this.address == "" || "详细地址", this.address == undefined) {
      // this.Base.toast('请输入详细的地址');
      return
    }
var that = this;
    // wx.showModal({
    //   title: '提示',
    //   content: '是否保存该地址',
    //   confirmText: "确认",
    //   success: function(res) {
    //     if (res.confirm) {
          if (this.id != undefined) {
            // var addressapi = new AddressApi();

            this.addressapi.clearaddress({
              check: that.check, employee_id: that.operatorinfo.id
            }).then( (clearaddress) => {

              this.addressapi.updateaddress({
                id: that.id,
                name: that.people,
                phonenumber: that.phone,
                region: that.city,
                address: that.address,
                morenaddress: that.check 
              }).then( (edit) => {
                // that.Base.setMyData({
                  // edit
                // });
              });



            })


          } else {
            // var addressapi = new AddressApi();
            this.addressapi.clearaddress({
              check: that.check,employee_id:that.operatorinfo.id
            }).then((clearaddress) => {
 
            this.addressapi.addaddress({
              name: that.people,
              employee_id: that.operatorinfo.id,
              phonenumber: that.phone,
              region: that.city,
              address: that.address,
              status: 'A',
              morenaddress: that.check
            }).then( (baocun) => {
              // that.Base.setMyData({
              //   baocun
              // });

            });
            })
          }
          // wx.navigateBack({

          // })
          // that.back();
          that.navigate('/address');
        // }
      // }
    // })


  }
  binddetele() {


    // var id = this.id;

    // var addressapi = new AddressApi();
    // wx.showModal({
    //   title: '提示',
    //   content: '是否删除该地址',
    //   confirmText: "确认",
    //   success: function(res) {
    //     if (res.confirm) {
      var that = this;
          this.addressapi.addressdelete({
            id: this.id,
          }).then( (detele) => {
            // this.Base.setMyData({
            //   detele
            // });
            // wx.navigateBack({

            // })
            that.navigate('/address');
          });
        // } else {}
    //   }
    // })
  }

}
