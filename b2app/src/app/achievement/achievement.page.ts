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
  selector: 'app-achievement',
  templateUrl: './achievement.page.html',
  styleUrls: ['./achievement.page.scss'],
  providers:[EnterpriseApi,OrderApi]
})
export class AchievementPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    public enterpriseApi: EnterpriseApi,
    public orderApi:OrderApi,
    
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute,enterpriseApi,orderApi);
    this.headerscroptshow = 480;
    // this.currentpage = "tab4";
    
    // AppBase.TABName = "tab3";
    // AppBase.LASTTAB = this;
    //this.isLoginPage=true;

  }
  id =''
 
  obj:any = {
    userName: '',
    mobile: '',
    orderno: '',
    start_time: '',
    end_time: ''
  }
  
  order = null

  tempOrder=null

  list = null

  allenterprise=null
  totalMoney = 0


  length = null;
  pageSize = null;
  pages = null;
  newPage = null;
  pageList = [];
  selPage = 1;
  data = null;
  setData = null;
  temporder=null;
  onMyLoad(){
    this.params;
    
  }
  onMyShow(){
    console.log('xixii');
    this.getmsg();
  }
  


  getmsg(){
    console.log(this.operatorinfo.enterprise_id)
    this.enterpriseApi.allenterprise({enterprise_id:this.params.enterprise_id}).then((allenterprise:any)=>{
      console.log(allenterprise)
      this.allenterprise = allenterprise;
      // for(var i=0;i<allenterprise.length;i++){
        
        this.orderApi.mylist({  enterprise_id:this.params.enterprise_id}).then((order:any)=>{
          console.log(order,'order');

          
          this.pageList=[];
          this.order = order.filter((item,idx)=>{
            if(item.order_status=='N' || item.order_status == 'Y' || item.order_status=='R') {
              this.totalMoney += parseFloat(item.totalamount);
              item.index = idx;
              item.order_status_name = '已完成';
              return item
            }
           
          });
         
          this.temporder=order;
         
          console.log(this.order,'ooo');
          console.log(this.totalMoney);
          this.getreturnorder();
        })
      // }
     
    })
  }
  returnlist
  getreturnorder(){
    
      this.orderApi.returnlist({gongsi:this.params.enterprise_id}).then((returnlist:any)=>{
          console.log(returnlist)
          this.returnlist = returnlist.filter((item)=>{
            this.totalMoney -= parseFloat(item.return_money);
            if(item.orderstatus=='Y' || item.orderstatus=='R'){
              item.order_status_name = item.orderstatus_name;
              item.orderno=item.order_orderno;
              item.receiver=item.order_receiver;
              item.finish_time=item.return_time;
              item.totalamount=item.return_money;
              this.order.push(item)
            }
            return item
          })
          for(var i=0;i<this.order.length;i++){
            this.order[i].index=i;
          }
          this.length = this.order.length;
          // this.pagination(this.order,this.length);
          console.log(this.totalMoney,'lll')
      })  
    
  }

  reset(){
    this.obj = {
      userName: '全部',
      mobile: '',
      orderno: '',
      start_time: '',
      end_time: ''
    }

   this.btnscolor=1;
    // this.totalMoney = 0
    // this.order = []
    // this.pageList = []
    // this.length = 0
    // this.pagination(this.order,this.length)
    this.getmsg();
    
  }

  checkorderno(item,arr){
    for(let iitem of arr){
      if(item.orderno == iitem.order_orderno){
        this.totalMoney -= parseFloat(iitem.return_money);
      }
    }
  }
  checklist(item,arr){
    for(let iitem of arr){
      if(item.order_id==iitem.id){
        return true;
      }
    }
  }
  search(item){
    this.returnlist=[];
    this.order = []
    this.totalMoney = 0
    this.btnscolor=1;
    if(item.userName=='全部'){
      this.getmsg();
    }

    console.log(item)
    if(item.userName!='' || item.mobile != ''){

      this.pageList = []
      this.enterpriseApi.allenterprise({ name: item.userName, mobile: item.mobile }).then((allenterprise:any)=>{
        console.log(allenterprise,'ppp')
      
       
          for(let i=0;i<allenterprise.length;i++){
            console.log(allenterprise[i],'lll')
            
           

            this.orderApi.mylist({  enterprise_id:allenterprise[i].enterprise_id, employee_id: allenterprise[i].id, orderno: item.orderno}).then((order)=>{
              

              this.orderApi.returnlist({gognsi:allenterprise[i].enterprise_id,baojia:allenterprise[i].id}).then((returnlist:any)=>{
                 
              

              this.tempOrder = order
              let tOrder = []
            
              for(let i=0;i<this.tempOrder.length;i++){
                let index = this.tempOrder[i].order_time.indexOf(' ')

                if(index != -1){
                  this.tempOrder[i].order_time = this.tempOrder[i].order_time.slice(0,index)
                }else {
                  this.tempOrder[i].order_time = this.tempOrder[i].order_time
                }
                console.log(this.tempOrder[i].order_time)
                if(item.start_time <= this.tempOrder[i].order_time){
                  if(item.end_time >= this.tempOrder[i].order_time){
                    tOrder.push(this.tempOrder[i])
                  }else if(item.end_time == ''){
                    tOrder.push(this.tempOrder[i])
                  }
                
                }else if(item.start_time == '' ){

                  if(item.end_time >= this.tempOrder[i].order_time){
                    tOrder.push(this.tempOrder[i])
                  }else if(item.end_time == ''){
                    tOrder.push(this.tempOrder[i])
                  }

                }
              }
              console.log(this.tempOrder)
              console.log(tOrder)
              
              for(let j=0;j<tOrder.length;j++){
                
                
                if(tOrder[j].order_status == 'N' ){
                 
                  this.order.push(tOrder[j])
                }

                if(tOrder[j].order_status == 'R'){
                  tOrder[j].order_status_name = '待退款'
                  this.order.push(tOrder[j])
                }

                if(tOrder[j].order_status == 'Y'){
                 
                  tOrder[j].order_status_name = '已退款'
                  this.order.push(tOrder[j])
                }

              }


              for(let reitem of returnlist){
                if(this.checklist(reitem,this.order)){
                    
                    reitem.order_status_name = reitem.orderstatus_name;
                    reitem.orderno=reitem.order_orderno;
                    reitem.receiver=reitem.order_receiver;
                    reitem.finish_time=reitem.return_time;
                    reitem.totalamount=reitem.return_money;
                    this.returnlist.push(reitem);
                }
              }

              for(let k=0;k<this.order.length;k++){
                // this.order[k].index = k;
                this.totalMoney += parseFloat(this.order[k].totalamount);

                 this.checkorderno(this.order[k],this.returnlist)
                 
              }

              this.order = this.order.concat(this.returnlist);
              for(let k=0;k<this.order.length;k++){
                this.order[k].index = k;
              }

              this.length = this.order.length
              // this.pagination(this.order,this.length)
              console.log(this.order,'ooo')
        
            })
          })
        }
  
      })

    }else {
      this.pageList = []

      this.orderApi.mylist({  orderno: item.orderno}).then((order)=>{
        this.orderApi.returnlist({}).then((returnlist:any)=>{
          console.log(returnlist,'return')
              this.tempOrder = order
              console.log(order)
              let tOrder = []
            
              for(let i=0;i<this.tempOrder.length;i++){
                let index = this.tempOrder[i].order_time.indexOf(' ')

                if(index != -1){
                  this.tempOrder[i].order_time = this.tempOrder[i].order_time.slice(0,index)
                }else {
                  this.tempOrder[i].order_time = this.tempOrder[i].order_time
                }
                console.log(this.tempOrder[i].order_time)
                if(item.start_time <= this.tempOrder[i].order_time ){
                  if(item.end_time >= this.tempOrder[i].order_time){
                    tOrder.push(this.tempOrder[i])
                  }else if(item.end_time == ''){
                    tOrder.push(this.tempOrder[i])
                  }
                }else if(item.start_time == '' ){

                  if(item.end_time >= this.tempOrder[i].order_time){
                    tOrder.push(this.tempOrder[i])
                  }else if(item.end_time == ''){
                    tOrder.push(this.tempOrder[i])
                  }

                }
              }

              for(let j=0;j<tOrder.length;j++){
               
                if(tOrder[j].order_status == 'N' ){
                 
                  this.order.push(tOrder[j])
                }

                if(tOrder[j].order_status == 'R'){
                  tOrder[j].order_status_name = '待退款'
                  this.order.push(tOrder[j])
                }

                if(tOrder[j].order_status == 'Y'){
                  
                  tOrder[j].order_status_name = '已退款'
                  this.order.push(tOrder[j])
                }


                for(let reitem of returnlist){
                  if(this.checklist(reitem,this.order)){
                      
                      reitem.order_status_name = reitem.orderstatus_name;
                      reitem.orderno=reitem.order_orderno;
                      reitem.receiver=reitem.order_receiver;
                      reitem.finish_time=reitem.return_time;
                      reitem.totalamount=reitem.return_money;
                      this.returnlist.push(reitem);
                  }
                }
              }

              for(let k=0;k<this.order.length;k++){
                // this.order[k].index = k;
                this.totalMoney += parseFloat(this.order[k].totalamount);

                this.checkorderno(this.order[k],this.returnlist)
              }

              this.order = this.order.concat(this.returnlist);
              for(let k=0;k<this.order.length;k++){
                this.order[k].index = k;
              }

              this.length = this.order.length
              // this.pagination(this.order,this.length)
              console.log(this.order,'1111')

      })
    })

    }

   
  }

bb=false;
btnscolor=1;
qihuan(e){
  this.btnscolor = e;
  if(e==1){
    this.myAll();
  }else if(e==2){
    this.myfinish();
  }else if(e==3){
    this.myreturn();
  }else if(e==4){
    this.myyitui();
  }
}
  myAll(){
    console.log(this.order)
    this.pageList = []
    this.bb=false
   
    if(this.order != null){
      let finOrder = this.order.filter((item)=>{
        if(item.order_status == 'N' || item.order_status == 'Y' || item.order_status == 'R'){
          item.order_status_name='已完成';
          return item
        }
         
      })

      this.returnlist.filter((item)=>{
        if(item.orderstatus == 'Y' || item.orderstatus == 'R'){
          item.order_status_name=item.orderstatus_name;
          finOrder.push(item);
        }
        
      })

      for(let k=0;k<finOrder.length;k++){
        finOrder[k].index = k;
      }

      this.order = finOrder
      this.length = this.order.length
      // this.pagination(this.order,this.length)
      console.log(this.order)

    }
   
  }

  myfinish(){
    console.log(this.order)
    this.pageList = []
    this.bb=false
   

    if(this.order != null){
      let finOrder = this.order.filter((item)=>{
        return item.order_status == 'N' || item.order_status == 'Y' || item.order_status == 'R'
      })

      for(let k=0;k<finOrder.length;k++){
        finOrder[k].index = k;
        finOrder[k].order_status_name = '已完成';
      }
  
      this.length = finOrder.length
      // this.pagination(finOrder,this.length)
  
      console.log(finOrder)
  
    }

  
  }

  myreturn(){
    this.pageList = []
    this.bb=true
    console.log(this.order)


    if(this.order != null){
      let reOrder = this.returnlist.filter((item)=>{
        return item.orderstatus == 'R'
      })

      for(let k=0;k<reOrder.length;k++){
        reOrder[k].index = k;
        reOrder[k].orderno=reOrder[k].order_orderno;
        reOrder[k].receiver=reOrder[k].order_receiver;
        reOrder[k].finish_time=reOrder[k].return_time;
        reOrder[k].totalamount=reOrder[k].return_money;
        reOrder[k].order_status_name='待退款';
      }
      
      this.length = reOrder.length
      // this.pagination(reOrder,this.length)
      console.log(reOrder)
  
    }
 
   
  }

  myyitui(){
    console.log(this.order)
    this.pageList = []
    this.bb=true;
   

    if(this.order != null){
      let yiOrder = this.returnlist.filter((item)=>{
        return item.orderstatus == 'Y'
      })

      
      for(let k=0;k<yiOrder.length;k++){
        yiOrder[k].index = k;
        yiOrder[k].orderno=yiOrder[k].order_orderno;
        yiOrder[k].receiver=yiOrder[k].order_receiver;
        yiOrder[k].finish_time=yiOrder[k].return_time;
        yiOrder[k].totalamount=yiOrder[k].return_money;
        yiOrder[k].order_status_name='已退货';
      }
      

      this.length = yiOrder.length
      // this.pagination(yiOrder,this.length)
      console.log(yiOrder)
    }

    

  }


}