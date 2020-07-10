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
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [EnterpriseApi, MemberApi, OrderApi]
})
export class LoginComponent extends AppBase {

  loginname = '';
  password = '';
  isremember = false;


  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public enterpriseApi: EnterpriseApi,
    public memberApi: MemberApi,
    public OrderApi: OrderApi,
  ) {
    super(router, activeRoute, instApi, OrderApi, enterpriseApi);
    this.isLoginPage = true;
  }
  onMyShow() {

    // setTimeout(() => {
    //   this.loginname = window.localStorage.getItem("lastloginname");
    //   if (this.loginname == null) {
    //     this.loginname = "";
    //   }
    //   this.password = window.localStorage.getItem("lastpassword");
    //   if (this.password == null) {
    //     this.password = "";
    //     this.isremember = false;
    //   } else if (this.password != '') {
    //     this.isremember = true;
    //   }
    // });


  }
  submitresult = "";
  submitresult2 = ""
  error = ''
  isOpen = false;

  trylogin() {
    if (this.loginname == '' || this.password == '') {
      return;
    }

    this.clearPopover();
    this.enterpriseApi.employeelogin({ mobile: this.loginname, password: (this.password), isb: 'Y' }).then((res: any) => {

      if (res.code == "0") {
        var token = res.return;
        window.localStorage.setItem("lastloginname", this.loginname);

        if (this.isremember == true) {

          window.localStorage.setItem("lastpassword", this.password);
          window.localStorage.setItem("token", token);
        } else {

          window.localStorage.setItem('lastpassword', '');
          window.sessionStorage.setItem("token", token);
        }
        let oldtime = (new Date()).getTime() + 10 * 60 * 1000;
        window.localStorage.setItem('oldtime', oldtime.toString())

        this.navigate("storeHome", { result: 'yes' });

      } else if (res.code == '2') {

        this.submitresult2 = res.return;
        this.isOpen = true;
      } else {

        this.submitresult = res.return;
        this.isOpen = true;
      }
    });
  }



  clearPopover() {
    this.submitresult = "";
    this.submitresult2 = ""
    this.error = '';
    this.isOpen = false;
  }




}