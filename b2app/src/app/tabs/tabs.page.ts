import { Component } from '@angular/core';
import { AppBase } from '../AppBase';
import { OrderApi } from "src/providers/order.api";
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  providers:[OrderApi]
})
export class TabsPage {

  static Instance:TabsPage=null;
  // static operatorinfo:TabsPage=null;
  currentpage="";
  enterprise_id="";
  id=null;
  constructor(public orderApi:OrderApi) {
    
  }
  hidetab=false;
  xz=1;
  count=0;
  tab1=null;
  tab2=null;
  tab3=null;
  tab4=null;
  tab5=null;

  ionViewDidEnter() {

    
    TabsPage.Instance=this;
    console.log(TabsPage.Instance,'歷史5555555555555555')
    console.log("asdasdasd555",AppBase.LASTTAB);
    if (AppBase.LASTTAB != null) {
      AppBase.LASTTAB.ionViewDidEnter();
    }
    console.log("asdasdasd55522",TabsPage.Instance.currentpage,TabsPage.Instance.enterprise_id,TabsPage.Instance.id,);
    // this.returnnum = AppBase.LASTTAB.returnnum;
    // this.ordernum = AppBase.LASTTAB.ordernum;
    // this.quotereadnum = AppBase.LASTTAB.quotereadnum;
    // this.risread = AppBase.LASTTAB.risread;
    // this.oread = AppBase.LASTTAB.oread;
    // this.isread = AppBase.LASTTAB.isread;
    this.update();
    setInterval(() => {
                
      this.update();
      console.log('也是也是yesyes')

      }, 20 * 1000);
  }
  flag = 'tab1';
  change(event)

  { 
    this.flag=event.detail.tab;
 
  }

    returnnum = '';
    ordernum = ''
    quotereadnum = ""
    risread = 'Y'
    oread = 'Y'
    isread = 'Y'
    update() {

      console.log('也是也是yesyes222555')
      if(TabsPage.Instance.id!=''){
        console.log('也是也是yesyes33333555')
      

        var that = this;
   
          var arrs = [];
    
       
         this.orderApi.orderisread({ enterprise_id:TabsPage.Instance.enterprise_id, employee_id:TabsPage.Instance.id }).then((ret: any) => {
            console.log(ret, '订单')
            if (ret) {
              if (ret.quote > '0') {
                this.isread = 'N';
                this.quotereadnum = ret.quote;
                // this.quotereadnum = '加载中';
              } else {
                this.isread = 'Y';
              }
    
              if (ret.order > '0') {
                this.oread = 'N';
                this.ordernum = ret.order;
                // this.ordernum =  '加载中';
               
              } else {
                this.oread = 'Y';
              }
    
              if (ret.return > '0') {
                this.risread = 'N';
                this.returnnum = ret.return;
                // this.returnnum = '加载中';
              } else {
                this.risread = 'Y';
              }
    
            }
            console.log(this.isread,'isread',this.risread,'risread',this.oread,'oread')
          })
    
       
      }
    }

  
}
