import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { ApiConfig } from '../api.config';
import { EnterpriseApi } from 'src/providers/enterprise.api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[InstApi,MemberApi,EnterpriseApi]
})
export class LoginComponent extends AppBase {
  instinfo = null;
  username='';
  password='';
  isremember=false;
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public memberApi:MemberApi,
    public enterpriseApi:EnterpriseApi,
  ) {
    super(router, activeRoute, instApi, memberApi,enterpriseApi);
    
    this.isLoginPage=true;
   }
  
   onMyLoad(){
     this.params;
     this.instApi.info({  }).then((instinfo) => {
      this.instinfo = instinfo;
    });
   }
   onMyShow(){
     setTimeout(() => {
      this.username=window.localStorage.getItem("lastusername");
      this.password=window.localStorage.getItem("lastpassword");
      if(this.password==null){
        this.password="";
        this.isremember = false;
      }else if (this.password != ''){
        this.isremember = true;
      }
     });
    
   }
  
   login(){
     console.log(this.username,this.password)
    if(this.username=="" || this.password==""){
      return
    }
    this.enterpriseApi.employeelogin({
      mobile:this.username,
      password:this.password,
      isb: 'Y' 
    }).then((res:any)=>{
      console.log(res);
      if(res.code=='0'){
        var token=res.return;
        window.localStorage.setItem("lastusername",this.username);
        
        if(this.isremember==true){
          window.localStorage.setItem("lastpassword",this.password);
        }
        window.localStorage.setItem("token",token);

        ApiConfig.SetToken(token);
        this.enterpriseApi.employeeinfo({}).then((info: any) => {
          window.localStorage.setItem("memberinfo",JSON.stringify(info)) ;
          //this.navigate("/");
          window.location.href="/";
      })


      }else {
        this.toast(res.result);
      }
    })
   }
  
}
