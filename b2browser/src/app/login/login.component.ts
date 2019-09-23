import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { DoctorApi } from 'src/providers/doctor.api';
import { ApiConfig } from '../api.config';
import { OperatorApi } from 'src/providers/operator.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[EnterpriseApi]
})
export class LoginComponent   extends AppBase  {

  loginname='';
  password='';
  isremember=false;

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi
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
      }
    });
    
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
        this.navigate("storeHome");
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
}