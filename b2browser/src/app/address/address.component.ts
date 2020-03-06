import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
import { AddressApi } from 'src/providers/address.api';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers:[InstApi,EnterpriseApi,AddressApi]
})
export class AddressComponent extends AppBase  {

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
  addresslist=[];
  onMyShow(){
    this.addressapi.addresslist({ 
    }).then( (addresslist:any) => {
      console.log(addresslist,'addresslist')
      this.addresslist=addresslist;
    })
  }

  bindaddressadd() {
    // wx.navigateTo({
    //   url: '/pages/addressadd/addressadd',
    // })
    this.navigate('/addressadd');
  }


  bindedit(id) {
    // var id = e.currentTarget.id;
    // wx.navigateTo({
    //   url: '/pages/addressadd/addressadd?id=' + id,
    // })
    this.navigate('/addressadd',{id:id});
  }

  bindchuandizhi(id) {
  console.log(1111111)
  var that = this;
    if(this.params.ad!=undefined){
      // var id = e.currentTarget.id;
      // var addressapi = new AddressApi();
      this.addressapi.addressinfo({
        id: id
      }).then( (addressinfo:any) => {

        // var pages = getCurrentPages();
        // var currPage = pages[pages.length - 1];   //当前页面
        // var prevPage = pages[pages.length - 2];  //上一个页面

        //不需要页面更新
        // prevPage.setData({
        //   info: addressinfo
        // })

        // wx.navigateBack({

        // })
        // that.navigate()

      })
    }
  
  }

}