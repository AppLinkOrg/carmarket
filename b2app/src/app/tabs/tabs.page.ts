import { Component } from '@angular/core';
import { AppBase } from '../AppBase';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  static Instance:TabsPage=null;
  currentpage="";
  constructor() {
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
    console.log("asdasdasd",AppBase.LASTTAB);
    if (AppBase.LASTTAB != null) {
      AppBase.LASTTAB.ionViewDidEnter();
    }

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


    returnnum = '';
    ordernum = ''
    quotereadnum = ""
    risread = 'Y'
    oread = 'Y'
    isread = 'Y'
    update() {

      console.log('也是也是yesyes222')
      if(AppBase.LASTTAB.operatorinfo.id!=''){
        console.log('也是也是yesyes33333')
      

        var that = this;
   
          var arrs = [];
    
       
          AppBase.LASTTAB.orderApi.orderisread({ enterprise_id: AppBase.LASTTAB.operatorinfo.enterprise_id, employee_id: AppBase.LASTTAB.operatorinfo.id }).then((ret: any) => {
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
