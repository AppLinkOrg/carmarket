import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { AppComponent } from "./app.component";
import { ReturnStatement } from "@angular/compiler";
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { OnInit, AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { InstApi } from '../providers/inst.api';
import { MemberApi } from '../providers/member.api';
import { EnterpriseApi } from 'src/providers/enterprise.api'; 
import { Buffer } from 'buffer';

declare let Chart: any;

export class AppBase implements OnInit {

    public right = "ABC";
    public needlogin = false;
    currentpage = "";
    platformname = "";
    isModal = false;

    isLoginPage = false;

    public static StaticMemberInfo = null;

    //public devicename="";

    public static devicename = "";
    public static Lang = null;
    public static TABName = "";
    public static LASTTAB = null;
    public static CurrentRoute: Router = null;
    public static Current: AppBase = null;
    public static myapp: AppComponent = null;
    public static UNICODE = "carmarkets";

    public statusBarStyle = "X";//{DARK}
    public uploadpath: string = ApiConfig.getUploadPath();
    public localpath: string = ApiConfig.getLocalPath();
    public uploadapi: string = ApiConfig.getFileUploadAPI();
    public util = AppUtil;
    public static Resources = null;
    public res = null;
    public static StaticInstInfo = null;

    public InstInfo = { name: "",tel:'',logo:'' };


    public options = null;
    public params: Params = null;


    public memberinfo = null;

    mySwiperOption = {
        zoom: {
            enabled: false
        }
    }

    position = ''
    bfscrolltop; // 获取软键盘唤起前浏览器滚动部分的高度



    public constructor(
        public router: Router,
        public activeRoute: ActivatedRoute,
        public instApi: InstApi,
        public memberApi: MemberApi,
        public enterpriseApi: EnterpriseApi
    ) {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            this.params = params;
        });
        this.res = [];
        // this.memberinfo = JSON.parse(window.localStorage.getItem("memberinfo"));
        var longlivetoken=window.localStorage.getItem("token");
        var token=window.sessionStorage.getItem("token");
        if(token==null&&longlivetoken!=null){
            window.sessionStorage.setItem("token",longlivetoken);
           
        }
        this.memberinfo = JSON.parse(window.localStorage.getItem("memberinfo"));
    }


    setStatusBar() {
        //  this.statusBar.styleLightContent();
        console.log('123123')
    }
    ngOnInit() {
        console.log('456456')
        this.bfscrolltop = document.body.scrollTop;
        ApiConfig.SetUnicode(AppBase.UNICODE);


        this.CheckPermission();
        this.getResources();
        this.getInstInfo();
        this.onMyLoad();
        this.setStatusBar();

        this.checktime();

    }
    CheckPermission() {
        console.log(111111)
        if (this.isLoginPage == false) {
            console.log(22222222)
            // var token = window.localStorage.getItem("token");
            var token = window.sessionStorage.getItem("token");

            console.log("token", '--', token);

            if (token == null) {
                this.navigate("login");
            } else {
                ApiConfig.SetToken(token);
                this.enterpriseApi.employeeinfo({}).then((info: any) => {
                    console.log(info,'info')
                    if (info != null) {
                        window.localStorage.setItem("memberinfo", JSON.stringify(info));

                        if (this.memberinfo == null) {
                            this.memberinfo = info;
                        }
                        //this.memberinfo = info;
                    } else {
                        this.navigate("login");
                    }

                })
            }
        }
    }
    checktime() {
        if (this.isLoginPage == true) {
            let nowtime = (new Date()).getTime();
            let oldtime = window.localStorage.getItem("oldtime");

            if (nowtime > Number(oldtime)) {
                // var al = alert("长时间不操作，请重新登录！")
                // this.navigate('/login');
            }
        }


    }
 
    onMyLoad() {


    }

   

    getInstInfo() {

       
        if (AppBase.StaticInstInfo == null) {
            this.instApi.info({}, false).then((instinfo: any) => {
                AppBase.StaticInstInfo = instinfo;
                this.InstInfo = instinfo;
                console.log(instinfo);
            });
        } else {

            this.InstInfo = AppBase.StaticInstInfo;
        }
        
    }

    instLoaded() {

    }

    getMemberInfo() {

    }
    getResources() {
        if (AppBase.Resources == null) {
            this.instApi.resources({}, false).then((res) => {
                AppBase.Resources = res;
                this.res = res;
            });
        } else {
            this.res = AppBase.Resources;
        }
    }

    ngAfterViewInit() {

        // if (Instance != null) {
        //     Instance.setModule(this.module, this.module2);
        // }
        if (this.memberinfo != null&&this.memberinfo.usertype!=undefined) {
            //alert(JSON.stringify(this.memberinfo));
            if (this.right.indexOf(this.memberinfo.usertype) < 0) {
                this.navigate("404");
                return;
            }
        }

        this.onMyShow();
    }

    onMyShow() {

    }

    windowslocation(url) {
        window.location.href = url;
    }
    navigate(pagename, param = {}) {
        this.router.navigate([pagename], { queryParams: param });
    }
    back() {
        window.history.back();
    }

    decode(val) {
        return AppUtil.HtmlDecode(val);
    }
    contentToLine(str) {
        if (str == null) {
            return "";
        }
        return str.split("\n");
    }

    tel(tel) {
        window.location.href = "tel:" + tel;
    }
    logout() {
        this.navigate("/login")
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("token");
    }



    showAlert(content, title = "提示") {


    }

    changedate(page) {
        console.log(page)
        if (page < 1 || page > this.pages) return;
        if(page==2){
            var newpageList = [];
            for (var i = (page - 2); i < ((page + 3) > this.pages ? this.pages : (page + 3)); i++) {
                newpageList.push(i + 1);
            }
            this.pageList = newpageList;
        }
        if (page > 2) {
            var newpageList = [];
            for (var i = (page - 3); i < ((page + 2) > this.pages ? this.pages : (page + 2)); i++) {
                newpageList.push(i + 1);
            }
            this.pageList = newpageList;
        }
        this.selPage = page;
        this.setData();
        this.isActivePage(page);
    }
    isActivePage(page) {
        return this.selPage == page;
    }

    Previous() {
        this.changedate(this.selPage - 1);
    }

    Next() {
        this.changedate(this.selPage + 1);
    }
    pageSize = 10;
    pages = null;
    newPage = null;
    selPage = null;
    data = [];
    pageList = [];
    setData = null;
    pagination(list, length) {

        this.pages = Math.ceil(length / this.pageSize);
        this.newPage = this.pages > 5 ? 5: this.pages;
        this.selPage = 1;

        this.setData = function () {
            this.data = list.slice(this.pageSize * (this.selPage - 1), this.pageSize * this.selPage);
        }
        this.data = list.slice(0, this.pageSize);


        for (var i = 0; i < this.newPage; i++) {
            this.pageList.push(i + 1);
        }
    }

    querySelector(str) {
        return document.querySelector(str);
    }
    upload(key, module, callback) {
        Chart.upload(ApiConfig.getFileUploadAPI(), key, module, callback);
    }

    checkMailFormat(email) {
        //^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (reg.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    base64encode(str) {
        return new Buffer(str).toString("base64");
    }
    base64decode(str) {

        return new Buffer(str, 'base64').toString()
    }
    warning(title, body) {
        Chart.warning("警告", title, body);
    }
    toast(com) {
        Chart.toast(com);
    }
    saveing(){
        Chart.saveing();
    }
    browserPrint(id) {
        // const printContent = document.getElementById(id);
        // const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
        // WindowPrt.document.write(printContent.innerHTML);
        // WindowPrt.document.close();
        // WindowPrt.focus();
        // WindowPrt.print();
        // WindowPrt.close();
        
        
        //window.print();
        Chart.print(id);
    }
    hidemodel(){
        Chart.hidemodel();
    }
}
