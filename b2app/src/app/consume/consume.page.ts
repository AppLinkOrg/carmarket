import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides, IonInfiniteScroll, IonMenu } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { TabsPage } from '../tabs/tabs.page';
import {EnterpriseApi} from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-consume',
  templateUrl: './consume.page.html',
  styleUrls: ['./consume.page.scss'],
  providers: [EnterpriseApi,OrderApi]
})
export class ConsumePage extends AppBase {

  constructor(public router: Router,
      public navCtrl: NavController,
      public modalCtrl: ModalController,
      public toastCtrl: ToastController,
      public alertCtrl: AlertController,
      public activeRoute: ActivatedRoute,
      private sanitizer: DomSanitizer,
      private elementRef: ElementRef,
      public enterpriseApi: EnterpriseApi,
      public orderApi: OrderApi,
  ) {
      super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute,enterpriseApi,orderApi);
      this.headerscroptshow = 480;
      // this.currentpage = "tab3";

      // AppBase.TABName = "tab3";
      // AppBase.LASTTAB = this;
  }
  onMyLoad(){
    //参数
    this.params;
   
    console.log('conconcocn')
  }
  consumelist=[];
  allenterprise=null
  name=''
  templist=null;
  shijian='';
  onMyShow() {
    
    this.getinfo();

  }
  getinfo(){
    this.enterpriseApi.allenterprise({enterprise_id:this.params.enterprise_id }).then((allenterprise:any)=>{
      console.log(allenterprise,'全部')
      this.allenterprise = allenterprise;
    })


    this.orderApi.consumelist({enterprise_id:this.params.enterprise_id,orderby:'r_main.consume_time desc'}).then((consumelist)=>{
      console.log(consumelist,'consumelist')
      this.templist = consumelist;
      this.consumelist = consumelist;
      
    })
  }
  search(){
    console.log('jinjin')
    if(this.name=='' && this.shijian==''){
      this.consumelist = this.templist
    }else {
      if(this.name!='' && this.shijian !=''){
        this.consumelist = this.templist.filter((item)=>{
          if(item.employee_name == this.name && item.consume_time_dateformat == this.shijian){
            return item
          }
        })
      }else {
        this.consumelist = this.templist.filter((item)=>{
          if(item.employee_name == this.name ){
            return item
          }else if(item.consume_time_dateformat == this.shijian){
            return item
          }
        })
      }

    }
}
reset(){
  this.name = '';
  this.shijian = '';
  this.consumelist = this.templist;
}
}