import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ApiConfig } from "../api.config";
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides, IonInfiniteScroll, IonMenu, LoadingController } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { AppComponent } from '../app.component';
import { TabsPage } from '../tabs/tabs.page';
import { TCPSocket } from 'src/DataMgr/TCPSocket';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
import { Sender } from 'src/DataMgr/Sender';
import { isNgTemplate } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Globalization } from '@ionic-native/globalization/ngx';
import {EnterpriseApi} from 'src/providers/enterprise.api'
import { OrderApi } from 'src/providers/order.api';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [EnterpriseApi,OrderApi]
})
export class Tab1Page extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public activeRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    public network: NetworkInterface,
    public ngzone: NgZone,
    public enterpriseApi: EnterpriseApi,
    public orderApi: OrderApi,
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute,enterpriseApi,orderApi);
    this.headerscroptshow = 480;
    this.currentpage = "tab1";

  }
  list = []
  monList = []

  count = 0
  totalIncome = 0

  monOrder = 0
  monIncome = 0

  goods = 0
  returnGoods = 0
  
  today_time = null
  today_time2=null
  year_mon = null

 enterprise_id = ''
 employee_id=''
 yituihuoGoods=0;
 yiwanchengGoods=0;
 emm_id='';
 
 onMyLoad(){
   this.params;
 
 }
 
  onMyShow() {
    console.log('快樂快樂快樂')
    AppBase.TABName = "tab1";
    AppBase.LASTTAB = this;
    
   this.getinfo();
    

  }


  getinfo(){
    this.count = 0;
    this.totalIncome = 0;
  
    this.monOrder = 0;
    this.monIncome = 0;
    this.list=[];
    this.monList=[];
    this.goods = 0;
    this.returnGoods = 0;
    this.yituihuoGoods=0;
    this.yiwanchengGoods=0;
    var a = this.orderApi;


    this.enterpriseApi.employeeinfo({ }).then((employeeinfo:any)=>{
      console.log(employeeinfo,'uuuooopp')
      this.enterprise_id = employeeinfo.enterprise_id;
   
      if(employeeinfo.position == 'B' || employeeinfo.power == 'Y'){
       
        this.employee_id = '';
       
      }else{
      
        this.employee_id = employeeinfo.id;
      }
  
        a.mylist({ enterprise_id: this.enterprise_id,employee_id:this.employee_id }).then((mylist:any)=>{
          
          console.log(mylist)
          a.returnlist({ gongsi: this.enterprise_id,baojia:this.employee_id,}).then((returnlist:any)=>{
            console.log(returnlist)
  
            let day = new Date();
            let year = day.getFullYear();
            let  month :any = (day.getMonth()+1)
            let date :any = day.getDate();
  
            month = month < 10 ? '0'+ month : month
            date = date < 10  ? '0'+ date : date
            this.today_time = year+ "/" + month + "/" + date+' '+'00:00:00';
            this.today_time2 = year+ "/" + month + "/" + date+' '+'23:59:59';
            this.year_mon = year+ "/" + month+'/01'+' '+'00:00:00';
  
            for(var k=0;k<returnlist.length;k++){
              if(new Date(this.today_time).getTime()<new Date(returnlist[k].return_time).getTime() && new Date(this.today_time2).getTime()>new Date(returnlist[k].return_time).getTime()){
                if(returnlist[k].orderstatus=='Y'){
                  this.yituihuoGoods ++ ;
                }
                if(returnlist[k].orderstatus=='R'){
                  this.returnGoods ++ ;
                }
              }
            }
           
            for(let i=0;i<mylist.length;i++){
             
  
              let index = mylist[i].order_time.indexOf('-');
              
              // mylist[i].order_time = mylist[i].order_time.substring(0,index+3);
              
              
              if(new Date(mylist[i].order_time).getTime()>new Date(this.year_mon).getTime()){
  
                if(new Date(this.today_time).getTime()<new Date(mylist[i].order_time).getTime() && new Date(this.today_time2).getTime()>new Date(mylist[i].order_time).getTime()){
                  
                  if(mylist[i].order_status != 'R' && mylist[i].order_status != 'Y' && mylist[i].order_status != 'I'){
                    if(mylist[i].order_status == 'L'){
                      this.goods ++;
                    }
                   
                    if(mylist[i].order_status == 'N'){
                      this.yiwanchengGoods ++ ;
                    }
                   
                    this.list.push(mylist[i]);
                   
                  }
                }
  
  
                if(mylist[i].order_status == 'N'){
                  this.monOrder ++  ;
                }
  
                  this.monList.push(mylist[i])
    
                  
               
  
              }
             
  
              if(mylist[i].order_status == 'N'){
                this.count ++ ;
              }
              
            }
            console.log(this.list,'upppppqqqq');
            console.log(this.monList,'upppppqqqq222');
            this.totalIncome =Number(this.getIncome(this.list,returnlist));
            this.monIncome = Number( this.getIncome(this.monList,returnlist));
          })
        })
       
  
    })
  }

  getIncome(list,returnlist){
    let income = 0
    for(let i=0;i<list.length;i++){
      for(let item of returnlist){
      if(list[i].order_status=='N'){
        income += Number( list[i].totalamount);
      }

     
        if(list[i].id==item.order_id && item.orderstatus=='Y'){
          income -= Number(item.return_money);
        }
      }
    }

    
    
    return income.toFixed(2);
  }

  reGoods(flag){
   if(flag){
    this.router.navigate(['tabs/tab3'],{
      queryParams: {
        // stauts: 'L',
        order_time_dateformat:this.today_time,
        // emm_id:this.emm_id,
        bb:2
      }
    })
   }else {
    this.router.navigate(['tabs/tab3'],{
      queryParams: {
        // stauts: 'Y',
        order_time_dateformat:this.today_time,
        // emm_id:this.emm_id,
        bb:4
      }
    })
   }
   
  }

  applyGoods(flag){
    console.log(flag)
    if(flag){
      this.router.navigate(['tabs/tab4'],{
        queryParams: {
          order_time_dateformat:this.today_time,
          status: 'R',
          // emm_id:this.emm_id,
          bb:2
        }
      })
    }else {
      this.router.navigate(['tabs/tab4'],{
        queryParams: {
          order_time_dateformat:this.today_time,
          status: 'Y',
          // emm_id:this.emm_id,
          bb:4
        }
      })
    }
   
  }

  todayOrder(){
    this.router.navigate(['tabs/tab3'],{
      queryParams: {
        // emm_id: this.emm_id
        bb:4
      }
    })
  }

  todayIncome(){

    if(this.position =='B'){
      this.router.navigate(['tabs/tab5'],{
        queryParams: {
          stauts: 'L',
          position:'B'
          // emm_id:this.emm_id
        }
      })
    }else{
      this.router.navigate(['tabs/tab5'],{
        queryParams: {
          stauts: 'L',
          // emm_id:this.emm_id
        }
      })
    }
    

  }

  monthOrder(){
    this.router.navigate(['tabs/tab3'],{
      queryParams: {
        month_time: this.year_mon,
        // emm_id: this.emm_id
      }
    })
  }

  monthIncome(){
    if(this.position =='B'){
      this.router.navigate(['tabs/tab5'],{
        queryParams: {
          stauts: 'L',
          position:'B'
          // emm_id:this.emm_id
        }
      })
    }else{
      this.router.navigate(['tabs/tab5'],{
        queryParams: {
          stauts: 'L',
          // emm_id:this.emm_id
        }
      })
    }
  }
}
