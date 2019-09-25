import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { DoctorApi } from 'src/providers/doctor.api';
import { ApiConfig } from '../api.config';
import { OperatorApi } from 'src/providers/operator.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[EnterpriseApi,MemberApi]
})
export class LoginComponent   extends AppBase  {

  loginname='';
  password='';
  isremember=false;
  isforget = false;
  inverify = false;


  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public memberApi:MemberApi,
  ) { 
    super(router,activeRoute,instApi);
    this.isLoginPage=true;
  }
  onMyShow(){ 
    setTimeout(() => {
      this.loginname=window.localStorage.getItem("lastloginname");
      if(this.loginname==null){
        this.loginname="";
      }
      this.password=window.localStorage.getItem("lastpassword");
      if(this.password==null){
        this.password="";
      }else {
        this.isremember = true
      }
    });
    console.log(this.isremember)
    console.log(window.localStorage.getItem("lastpassword"))
    console.log(window.localStorage.getItem("lastloginname"))
  }
  submitresult="";
  error = ''
  isOpen=false;

  trylogin(){
    if(this.loginname==''||this.password==''){
      return;
    }

    this.clearPopover();
    this.instApi.employeelogin({mobile:this.loginname,password:(this.password)}).then((res:any)=>{
        console.log(res)
      if(res.code=="0"){
        var token=res.return;
        window.localStorage.setItem("lastloginname",this.loginname);
        
        if(this.isremember==true){
          window.localStorage.setItem("lastpassword",this.password);
          window.localStorage.setItem("token",token);
        }
        window.sessionStorage.setItem("token",token);
        this.navigate("storeHome",{result: 'yes'});
        console.log(this.isremember)
        console.log( window.sessionStorage.getItem("token"))
      }else{
        console.log('aaaa')
        this.submitresult=res.return;
        this.error = '用户名或密码错误，请重新登录'
        console.log(this.error)
        this.isOpen=true;
      }
    });
  }

  clearPopover(){
    this.submitresult="";
    this.error = '';
    this.isOpen=false;
  }

  forgetpass(){
    this.isforget = true;
  }

  backlogin(){
    this.isforget = false;
  }

  resetPwd(){
    this.isforget = false;

  }

  telephone = ''

  sendVerifyCode() {
    

    // this.memberApi.checkcanreg({ mobile: this.telephone }).then(ret => {
    //   console.log(ret);

    //   if (ret.code == "0") {
    //     // this.inverify = true;
    //     this.aliyunApi.sendverifycode({
    //       mobile: this.mobile,
    //       type: "register"
    //     }).then(ret => {
    //       console.log(ret);
    //       if (ret.code == 0) {
    //         this.reminder = 60;
    //         this.show = 1;

    //         this.c1 = "";
    //         this.c2 = "";
    //         this.c3 = "";
    //         this.c4 = "";
    //         //this.$refs["inputc1"].focus();

    //         //var obj = this.ele.nativeElement.querySelector('#inputc1');
    //         //obj.focus();

    //         this.toast("验证码已发送，请注意查收");
    //         this.diyici = true;
    //         this.setInVerify();
    //       } else {
    //         this.toast("验证码发送失败，请稍后重试");
    //       }
    //     });
    //   } else {
    //     this.toast("手机号码已经被使用");
    //   }
    // });
  }
}