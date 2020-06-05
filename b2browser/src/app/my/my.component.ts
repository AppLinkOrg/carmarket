import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.scss'],
  providers:[InstApi,EnterpriseApi]
})
export class MyComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }
  onMyShow(){
    
  }

  bindjilu() {
    // var id = e.currentTarget.id;
    // wx.navigateTo({
    //   url: '/pages/jiaoyijilu/jiaoyijilu?id=' + id,
    // })
    this.navigate('/jiaoyijilu');
  }

  


  bindright() {
    // wx.navigateTo({
    //   url: '/pages/edit/edit',
    // })
    this.navigate('/edit');
  }

  bindorder() {
    // wx.reLaunch({
    //   url: '/pages/order/order',
    // })
    this.navigate('/watchorder');
  }

  bindaddress() {
    // wx.navigateTo({
    //   url: '/pages/address/address',
    // })
    this.navigate('/address');
  }
  bindauth() {
    // wx.navigateTo({
    //   url: '/pages/authority/authority',
    // })
    this.navigate('/authority');
  }

  bindchange() {
    // wx.navigateTo({
    //   url: '/pages/change/change',
    // })
    this.navigate('/change');
  }
  bindaboutus() {
    // wx.navigateTo({
    //   url: '/pages/aboutus/aboutus',
    // })
    this.navigate('/aboutus');
  }

  bindhelp() {
    // wx.navigateTo({
    //   url: '/pages/helpcenter/helpcenter',
    // })
    this.navigate('/helpcenter');
  }  
  bindaccount(){
    // wx.navigateTo({
    //   url: '/pages/account/account',
    // })
    this.navigate('/account');
  }
 


}

