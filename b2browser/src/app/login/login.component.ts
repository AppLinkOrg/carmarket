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
    this.loginname=window.localStorage.getItem("lastloginname");
    if(this.loginname==null){
      this.loginname="";
    }
    this.password=window.localStorage.getItem("lastpassword");
    if(this.password==null){
      this.password="";
    }
  }
  submitresult="";
  isOpen=false;
  trylogin(){
    if(this.loginname==''||this.password==''){
      return;
    }
    this.clearPopover();
    this.instApi.employeelogin({mobile:this.loginname,password:ApiConfig.MD5(this.password)}).then((res:any)=>{
      if(res.code=="0"){
        var token=res.return;
        window.localStorage.setItem("lastloginname",this.loginname);
        
        if(this.isremember==true){
          window.localStorage.setItem("lastpassword",this.password);
          window.localStorage.setItem("token",token);
        }
        window.sessionStorage.setItem("token",token);
        this.navigate("");
      }else{
        this.submitresult=res.return;
        this.isOpen=true;
      }
    });
  }

  clearPopover(){
    this.submitresult="";
    this.isOpen=false;
  }
}