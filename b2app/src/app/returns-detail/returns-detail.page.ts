import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides, IonInfiniteScroll, IonMenu } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { TabsPage } from '../tabs/tabs.page';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
import { MemberApi } from 'src/providers/member.api';
import * as echarts from 'echarts';

@Component({
  selector: 'app-returns-detail',
  templateUrl: './returns-detail.page.html',
  styleUrls: ['./returns-detail.page.scss'],
  providers: [EnterpriseApi, OrderApi,MemberApi]
})
export class ReturnsDetailPage extends AppBase {

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
    public memberApi: MemberApi,
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute, enterpriseApi,orderApi);
    this.headerscroptshow = 480;
    // this.currentpage = "returnsDetail";

    // AppBase.TABName = "tab3";
    // AppBase.LASTTAB = this;
  }
  id = '';
  returndetail = {};
  returnitem = [];

  returnstatus = '';
  onMyLoad() {
    this.params;
    this.id = this.params.id

    

  }
  getinfo() {
    this.orderApi.returndetail({ id: this.id }).then((returndetail: any) => {
      console.log(returndetail, 'llllll')
      this.returnstatus = returndetail.orderstatus;
      this.returndetail = returndetail;
      this.returnitem = returndetail.tuihuoitem.filter((item) => {
        if (returndetail.id == item.tuihuo_id) {
          return item
        }
      })
    })
  }
  onMyShow() {
    // AppBase.TABName = "tab3";
    // AppBase.LASTTAB = this;
    console.log('retrun')
    this.getinfo();
  }
  saveQuote(item){
    var that = this
    console.log(item,'hhhhhhhhh')
    console.log(this.operatorinfo)
    if(item.orderstatus=='R'){

      item.orderstatus = 'I'
      this.orderApi.updatereturnstatus({id:item.id,orderstatus:item.orderstatus,order_id:item.order_id}).then((updatereturnstatus:any)=>{
        console.log(updatereturnstatus)
        // if(updatereturnstatus.code=='0'){
          this.navigate('tabs/tab4')
        // }
      })

    }else if(item.orderstatus=='I'){
      that.orderApi.addxiaofei({type:"R",amount:item.return_money,enterprise_id:item.enterprise_id,employee_id:item.employee_id,order_id:item.order_id,returnemp_id:this.operatorinfo.id}).then((addconsume)=>{
        console.log(addconsume,'aaaa')
        if(addconsume){
          that.memberApi.editenterprise({id:this.operatorinfo.enterprise_id,account_money:item.return_money}).then((editenterprise)=>{
            if(editenterprise){
              console.log(this.operatorinfo.enterprise_id)
              that.orderApi.updatemoney({ent_id:item.enterprise_id,money:item.return_money}).then(()=>{

              })

              that.orderApi.addxiaofei({type:"R",amount:item.return_money,enterprise_id:this.operatorinfo.enterprise_id,employee_id:this.operatorinfo.id,order_id:item.order_id}).then(()=>{

              })
              that.memberApi.editmoney({id:this.operatorinfo.id,sales_volume:item.return_money}).then((editmoney)=>{
                if(editmoney){
                  item.orderstatus='Y'
                  that.orderApi.updatereturnstatus({id:item.id,orderstatus:item.orderstatus,order_id:item.order_id}).then((updatereturnstatus:any)=>{
                    console.log(updatereturnstatus)
                    // if(updatereturnstatus.code=='0'){
                      that.navigate('tabs/tab4')
                    // }
                  })
                }
              })
            }
          })
          
        }
      })
    }

  }

  tongyi(item){
    var that = this;
    this.confirm2('同意给买家退货？',function(ret){
      console.log(ret)
      if(ret){
        that.saveQuote(item);
      }
    })
  }
  yishou(item){
    var that = this;
    this.confirm2('已经收到买家的退回来的货品？',function(ret){
      console.log(ret)
      if(ret){
        that.saveQuote(item);
      }
    })
  }
  async confirm2(msg, confirmcallback) {

    const alert = await this.alertCtrl.create({
        header: "退货提示",
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
}

