import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides, IonInfiniteScroll, IonMenu } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { AppComponent } from '../app.component';
import { TabsPage } from '../tabs/tabs.page';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
  providers: [EnterpriseApi, OrderApi, MemberApi]
})
export class OrderDetailPage extends AppBase {

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
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute, enterpriseApi,orderApi);
    this.headerscroptshow = 480;

    // AppBase.TABName = "tab1";
    // AppBase.LASTTAB = this;
  }
  classifylist = [];
  onMyShow() {
    console.log('orderdetail')
    this.getinfo();
  }
  id = '';
  list = {};
  list2 = null;
  list3=[];
  orderItem = [];

  onMyLoad() {
    this.params;
    this.id = this.params.id;
  }
  getinfo() {
    var a = this.orderApi

    a.detail({ id: this.id }).then((detailList: any) => {

      this.enterpriseApi.getemployeeinfo({ id: detailList.baojia }).then((getemployeeinfo: any) => {
        console.log(getemployeeinfo, '嘻嘻嘻嘻嘻')
        detailList.baojiaperson = getemployeeinfo.name
        detailList.baojiacom = getemployeeinfo.enterprise_name
      })
      console.log(detailList,'detailList')
     
      this.orderItem = detailList.orderitem.filter(item => {
        if (detailList.id == item.order_id) {
          return item
        }
      })
    

      this.orderApi.quoteinfo({ id: detailList.quote_id }).then((quoteinfo: any) => {
        console.log(quoteinfo)
        detailList.quote_time = quoteinfo.quote_time
      })
      this.list = detailList;
      this.list2 = detailList;
      this.list3.push(detailList);
      console.log(this.list, 'lllllllll')
      console.log(this.orderItem)
    })
  }
  ifquxiao() {
    var that =this;
    
    this.orderApi.detail({ id: this.id }).then((detailList: any) => {

      if (detailList.order_status == "E") {
        // this.quxiao = true;
        this.confirm3('买家已经取消订单，请选择其他订单！',function(ret){
          if(ret){
            // that.back();
            that.navigate('tabs/tab3')
          }
        })
      }else {
        that.changeStatus();
      }
    })
  }
  quxiao = false
  changeStatus() {


    this.list2.order_status = "M";
    this.orderApi.updatestatus({ id: this.list2.id, order_status: this.list2.order_status, status: 'A' }).then((updatestatus: any) => {

      if (updatestatus.code == 0) {
        // this.router.navigate(['receiveGoodsDetail'], { queryParams: { id: this.id } });
        this.onMyLoad();
      }
    })


  }
  fankui(url){
    this.navigate('tabs/tab3')
}
  print() {
    window.open('https://cmsdev.app-link.org/alucard263096/carmarkets/api/order/print?order_id=' + this.id);
  }
  fahuo(){
    var that = this;
    this.confirm2('现在给买家发货吗？',function(ret){
      console.log(ret)
      if(ret){
        that.ifquxiao();
      }
    })
  }
  async confirm2(msg, confirmcallback) {

    const alert = await this.alertCtrl.create({
        header: "发货提示",
        subHeader: msg,
        buttons: [{
          text: "取消",
          handler: () => {
              console.log('Disagree clicked');

              confirmcallback(false);
          }
      }, {
            text: "确认",
            handler: () => {
                confirmcallback(true);
            }
        }]
    });
    alert.present();
}
async confirm3(msg, confirmcallback) {

  const alert = await this.alertCtrl.create({
      header: "订单取消提示",
      subHeader: msg,
      buttons: [ {
          text: "确认",
          handler: () => {
              confirmcallback(true);
          }
      }]
  });
  alert.present();
}
}
