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


  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public memberApi:MemberApi,
  ) { 
    super(router,activeRoute,instApi,enterpriseApi);
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
          this.isremember = false;
        }else if (this.password != ''){
          this.isremember = true;
        }
      });
      // console.log(this.isremember)
      // console.log(window.localStorage.getItem("lastpassword"))
      // console.log(window.localStorage.getItem("lastloginname"))


   
  }
  submitresult="";
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
       
        this.navigate("storeHome",{result: 'yes'});
        console.log(this.isremember)
        console.log( window.sessionStorage.getItem("token"))
      }else if(res.code='404'){
        console.log('aaaa')
        this.submitresult=res.return;
        this.error = '用户不存在！请更换用户'
        console.log(this.error)
        this.isOpen=true;
      }else{
        console.log('aaaa')
        this.submitresult=res.return;
        // this.error = '用户不存在！请更换用户'
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

 


}