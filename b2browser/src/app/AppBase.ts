import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { InstApi } from "../providers/inst.api";
import { OrderApi } from "../providers/order.api";
import { AppComponent } from "./app.component";
import { ReturnStatement } from "@angular/compiler";
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { OnInit, AfterViewInit,ElementRef} from '@angular/core';
import { EnterpriseApi } from 'src/providers/enterprise.api'; 
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare let Wechat: any;

export class AppBase implements OnInit {
    public needlogin = false;
    currentpage = "";
    platformname = "";
    isModal = false;

    isLoginPage = false;

    //public devicename="";

    public static devicename = "";

    public static TABName = "";
    public static LASTTAB = null;
    public static CurrentRoute: Router = null;
    public static Current: AppBase = null;
    public static myapp: AppComponent = null;
    public static UNICODE = "carmarkets";

    public statusBarStyle = "X";//{DARK}
    public uploadpath: string = ApiConfig.getUploadPath();
    public localpath: string = ApiConfig.getLocalPath();
    public util = AppUtil;
    public static Resources = null;
    public res = null;
    public static StaticInstInfo = null;

    public InstInfo = { name: "",tel:'' };


    public options = null;
    public params: Params = null;


    public operatorinfo={id:0,name:"",photo:"",loginname:"",enterprise_id:"",enterprise:{account_money:0,logo:"",name:''},position:''};

    mySwiperOption = {
        zoom: {
            enabled: false
        }
    }

    position=''
    bfscrolltop; // 获取软键盘唤起前浏览器滚动部分的高度



    public constructor(
        public router: Router,
        public activeRoute: ActivatedRoute,
        public instApi: InstApi,
        public orderapi: OrderApi,
        public enterpriseApi: EnterpriseApi
    ) {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            this.params = params;
        });
        this.res = [];

        var longlivetoken=window.localStorage.getItem("token");
        var token=window.sessionStorage.getItem("token");
        if(token==null&&longlivetoken!=null){
            window.sessionStorage.setItem("token",longlivetoken);
        }
       
        
    }

    
    setStatusBar() {
        //  this.statusBar.styleLightContent();
        
    }
    ngOnInit() {
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
        if (this.isLoginPage == false) {
            var token = window.sessionStorage.getItem("token");

            console.log("token");

            if (token == null) {
                this.router.navigate(["login"]);
            } else {
                ApiConfig.SetToken(token);
                this.enterpriseApi.employeeinfo({}).then((operator:any)=>{
                    console.log(operator,'operator')
                    if(operator==null){
                        this.router.navigate(["login"]);
                    }else{
                        this.operatorinfo=operator;
                        this.position = operator.position
                    }
                });
            }
        }
    }
    checktime(){
        if(this.isLoginPage==true){
            let nowtime = (new Date()).getTime();
            let oldtime = window.localStorage.getItem("oldtime");
    
            if(nowtime > Number(oldtime)  ){
                
                var al = alert("长时间不操作，请重新登录！")
                this.navigate('/login');
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
    back(){
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
    logout(){
        this.navigate("/login")
        window.sessionStorage.removeItem("token");
        window.localStorage.removeItem("token");
    }
   


    showAlert(content,title="提示"){
     
          
    }
    
    
    
}
