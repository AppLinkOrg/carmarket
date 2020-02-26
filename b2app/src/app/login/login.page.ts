import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers:[MemberApi,EnterpriseApi,OrderApi]
})
export class LoginPage  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute,enterpriseApi,orderApi);
    this.headerscroptshow = 480; 
      this.lang={};
      this.isLoginPage=true;
  }
  lang=null;
  loginname='';
  password='';
  isremember=false;
  onMyLoad(){
    //参数
    this.params;
  }
 
  onMyShow(){
    this.loginname=window.localStorage.getItem("lastloginname");
    if(this.loginname==null){
      this.loginname="";
    }
    this.password=window.localStorage.getItem("lastpassword");
    if(this.password==null){
      this.password="";
      this.isremember = false;
    }else if (this.password != ''){
      this.isremember = true;
    }
  }

  submitresult="";
  submitresult2=""
  error = ''
  isOpen=false;

  trylogin(){
    if(this.loginname==''||this.password==''){
      return;
    }

    this.clearPopover();
    this.enterpriseApi.employeelogin({mobile:this.loginname,password:(this.password),isb: 'Y'}).then((res:any)=>{
        console.log(res)
      if(res.code=="0"){
        var token=res.return;
        window.localStorage.setItem("lastloginname",this.loginname);
        
        if(this.isremember==true){
          console.log('gggg')
          window.localStorage.setItem("lastpassword",this.password);
          window.localStorage.setItem("token",token);
        }else {
          console.log('ooo')
          window.localStorage.setItem('lastpassword','');
          window.sessionStorage.setItem("token",token);
        }
        let oldtime = (new Date()).getTime() + 10*60*1000;
        window.localStorage.setItem('oldtime',oldtime.toString())
        console.log(window.localStorage.getItem("oldtime"),'time')
        this.navigate("tabs/tab1",{result: 'yes'});
        console.log(this.isremember)
        console.log( window.sessionStorage.getItem("token"))
      }else if(res.code=='2'){
        console.log('aaaa')
        this.submitresult2=res.return;
        this.isOpen=true;
        this.error = res.return;
      }else{
        console.log('aaaa')
        this.submitresult=res.return;
        this.isOpen=true;
        this.error = res.return;
      }
    });
  }



  clearPopover(){
    this.submitresult="";
    this.submitresult2=""
    this.error = '';
    this.isOpen=false;
  }

}
 