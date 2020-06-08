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
  selector: 'app-yibaojia',
  templateUrl: './yibaojia.page.html',
  styleUrls: ['./yibaojia.page.scss'],
  providers: [EnterpriseApi,OrderApi]
})
export class YibaojiaPage extends AppBase {

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
    // this.currentpage = "tab1";

  }
  onMyLoad(){
    this.params;
  }

  quoteinfo={};
  tempquotinfo=[];
  id='';
  list=[];

  employee_id=''
  employee_id_name=''
  enterprise_id_name=''
  enterprise_id = ''

  perInfo = []
  quote_id=''
  invalid=''

  onMyShow(){
    this.activeRoute.queryParams.subscribe(queryParams=>{
      console.log(queryParams)
      // this.id = queryParams.id
      this.quote_id = queryParams.quote_id

      var a = this.orderApi

      this.enterpriseApi.employeeinfo({}).then((employeeinfo: any) => {
        console.log(employeeinfo,'OOPPP')
        this.enterprise_id = employeeinfo.enterprise_id
        this.employee_id = employeeinfo.id
        this.employee_id_name = employeeinfo.name
        this.enterprise_id_name = employeeinfo.enterprise.name

        this.orderApi.yiquotelist({quote_id:this.quote_id,quoteenterprise_id: this.enterprise_id}).then((yiquotelist:any)=>{
          console.log(yiquotelist,'yiyyyiyiyi')

          for(let item of yiquotelist){
            this.id = item.id
          }

          a.yiquoteinfo({ id: this.id,quote_id: this.quote_id }).then((quoteinfo:any)=>{

        
            this.quoteinfo = quoteinfo;
            console.log(this.quoteinfo,'jjjjj')
            this.invalid = quoteinfo.invalid_value
            
            for(let item of quoteinfo.fittingsitem){
              if(item.quoteitems.length != 0){
                console.log('llll')
             
                for(let list of item.quoteitems){
                  console.log('aaaa')
                    if(  list.enterprise_id == this.enterprise_id){
                      console.log('ooooo')
                      this.list.push(list)
                  }
                  
                  // this.employee_id = list.employee_id
                  // this.enterprise_id_name = list.edt_name
                  // this.enterprise_id = list.enterprise_id
                }
              }
            
            }
            this.tempquotinfo.push(this.quoteinfo);
            console.log(this.list,'list')
          })
    

        })


    })


    })
    
  

      this.enterpriseApi.allenterprise({ id: this.employee_id,enterprise_id: this.enterprise_id}).then((info:any)=>{
        console.log(info,'info')
        for(let i=0;i<info.length;i++){
          if(info[i].id == this.employee_id && info[i].enterprise_id==this.enterprise_id){
            this.employee_id_name = info[i].name
            this.perInfo.push( info[i] )
          }
        }
      })
      

      console.log(this.perInfo,'perInfo')
      console.log(this.list)
      console.log(this.employee_id,this.employee_id_name,this.enterprise_id_name)
   
    
  }
  fanhui(){
    this.navigate('tabs/tab2')
  }
  }


