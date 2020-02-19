import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { NavController, ModalController, ToastController, NavParams, AlertController }
    from "@ionic/angular";
import { InstApi } from "../providers/inst.api";
import { MemberApi } from "../providers/member.api";
// import { WechatApi } from "../providers/wechat.api";
import { AppComponent } from "./app.component";
import { ReturnStatement } from "@angular/compiler";
import { ViewController } from '@ionic/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { TabsPage } from './tabs/tabs.page';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AppPage } from 'e2e/src/app.po';
import { from } from 'rxjs';
import { TCPSocket } from 'src/DataMgr/TCPSocket';
import { Globalization } from '@ionic-native/globalization/ngx';
import { Language } from './lang';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
declare let wx: any;

export class AppBase implements OnInit,OnDestroy {
    public needlogin = true;

    assets = "/assets/"

    public static TABName = "";
    public static LASTTAB = null;
    public static CurrentRoute: Router = null;
    public static CurrentNav: NavController = null;

    public static myapp: AppComponent = null;
    public static instapi: InstApi = null;
    
    public static memberapi: MemberApi = null;
    // public static wechatApi: WechatApi = null;
  

    public static UNICODE = "carmarkets";
  

    public statusBarStyle = "X";//{DARK}
    public uploadpath: string = ApiConfig.getUploadPath();
    public util = AppUtil;
    public static Resources = null;
    public res = null;
    public static InstInfo = null;
    public static MemberInfo = null;
    public InstInfo = { h5sharelogo: "", h5sharetitle: "", h5sharedesc: "", tel: "", h5appid: "", kf: "", openning: "", successtips: "", orderneedknow: "", name: "", logo: "", memberlogo: "", undershipping: 0, shippingfee: 0, about1: "", about2: "", about3: "", about4: "", about5: "", customerservicemobile: "", currency_name: "HKD", comrate: 0 };

    public static MYBABY = [];
    public mybaby = [];
    public options = null;
    public params: Params = null;

    public formdata = null;

    public keyt = "memberinfo99";
    public stat = "stat9";

    public heading = "汽配";
    public font = "简体"

    public firseonshow = true;
    public scrolltop = 0;
    public headerscroptshow = 0;
    public static is_mongceng = false;
    public static IsLogin = false;

    static Current = null;
    currentpage = "";
    isLoginPage = false;
    public operatorinfo={id:0,name:"",photo:"",loginname:"",enterprise_id:""};
    public static devicename = "";


    public constructor(
        public router: Router,
        public navCtrl: NavController,
        
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public activeRoute: ActivatedRoute,
        public enterpriseApi: EnterpriseApi,
        public orderApi: OrderApi,
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
        console.log('走没走')
       
        ApiConfig.SetUnicode(AppBase.UNICODE);
        this.getResources();
        // this.CheckPermission();
        this.getInstInfo();
        this.onMyLoad();

       
    }

    obj = null
    returnnum = '';
    ordernum = ''
    quotereadnum = ""
    risread = 'Y'
    oread = 'Y'
    isread = 'Y'
    update() {




        var that = this;
    
        // this.enterpriseApi.employeeinfo({}).then((employeeinfo: any) => {
        //   console.log(employeeinfo)
    
        //   if (employeeinfo.enterprise_id == "0") {
        //     this.router.navigate(["login"]);
        //     return
        //   }
        //   this.employee_id = employeeinfo.id;
        //   this.enterprise_id = employeeinfo.enterprise_id
        //   console.log("进来了");
        //   console.log(333333)
        //   console.log(employeeinfo)
        //   console.log(employeeinfo.enterprise_id, employeeinfo.id)
        //   console.log(44444444)
    
        //   var a = this.orderapi
          var arrs = [];
    
       
          this.orderApi.orderisread({ enterprise_id: this.operatorinfo.enterprise_id, employee_id: this.operatorinfo.id }).then((ret: any) => {
            console.log(ret, '订单')
            if (ret) {
              if (ret.quote > '0') {
                this.isread = 'N';
                this.quotereadnum = ret.quote;
                // this.quotereadnum = '加载中';
              } else {
                this.isread = 'Y';
              }
    
              if (ret.order > '0') {
                this.oread = 'N';
                this.ordernum = ret.order;
                // this.ordernum =  '加载中';
               
              } else {
                this.oread = 'Y';
              }
    
              if (ret.return > '0') {
                this.risread = 'N';
                this.returnnum = ret.return;
                // this.returnnum = '加载中';
              } else {
                this.risread = 'Y';
              }
    
            }
          })
    
    
    
    
    
    
    
    
        // })
    
       
      }
      lists = [];
      getquot() {
        this.lists= [];
        
        this.orderApi.quotelist({}).then((lists:any) => {
          this.lists = lists;
        //   console.log(lists)
          if (this.lists.length == lists.length) {
            this.getigro();
            // console.log("aaaaaaa");
    
          }
        })
      }
      ignores = [];
      getigro() {
        this.ignores = [];
        var a = this.orderApi;
        a.ignore({ quoteemployee_id: this.operatorinfo.id, quoteenterprise_id: this.operatorinfo.enterprise_id }).then((ignores: any) => {
          this.ignores = ignores;
        //   console.log(ignores)
          if (this.ignores.length == ignores.length) {
            // console.log("bbbbbbbb")
            this.getquotion();
          }
    
        })
      }
      quotions = [];
      getquotion() {
        this.quotions = [];
        var a = this.orderApi;
        a.quotationlist({ quotecompan_id: this.operatorinfo.enterprise_id }).then((quotationlist: any) => {
          this.quotions = quotationlist;
        //   console.log("cccccccc");
        //   console.log(quotationlist)
          if (this.quotions.length == quotationlist.length) {
            this.saoxuan();
          }
    
        })
      }
    
      saoxuan() {
        for (var i = 0; i < this.lists.length; i++) {
          if (this.lists[i].quotestatus == 'Q' || this.lists[i].quotestatus == 'W') {
    
            if (this.notinignore9(this.lists[i], this.ignores)) {
            
              if (this.notinignore8(this.lists[i], this.quotions)) {
               
                this.lists[i].quote_id = this.lists[i].id;
                this.lists[i].quoteper = this.operatorinfo.id;
                this.lists[i].quotecompan_id = this.operatorinfo.enterprise_id;
                this.lists[i].quotestatus = "Q";
                this.lists[i].pinzhi = this.lists[i].pinzhi;
                this.lists[i].photo1 = this.lists[i].photo1;
                if (this.lists[i].invoice_demand != "") {
                  this.lists[i].invoice_demand = this.lists[i].invoice_demand;
                } else if (this.lists[i].invoice_demand == "" && this.lists[i].invoice_demand_value != "") {
                  this.lists[i].invoice_demand = this.lists[i].invoice_demand_value;
                }
                delete this.lists[i].id;
    
    
                this.addquote(i, this.lists[i]);
    
    
    
              }
    
            }
    
    
          }
    
        }
    
      }
    
      addquote(i, json) {
        var a = this.orderApi;
        setTimeout(() => {
          a.addquotation(json).then((addquotation: any) => {
            console.log(addquotation, 'addquotation');
          })
        }, i * 600);
    
      }
    
      notinignore8(item, arr) {
        for (let yiitem of arr) {
            if(yiitem.quote_id==item.id && yiitem.quotestatus=='W'){
              return false
            }
          if (yiitem.quote_id =='0') {
            return false
          }
    
        }
        return true
      }
    
      notinignore9(item, ignore) {
        for (let igitem of ignore) {
          if (item.id == igitem.quote_id) {
            return false;
          }
        }
        return true;
      }
  
  
    
    position='';
    CheckPermission() {
        console.log('走了111111')
        if (this.isLoginPage == false) {
            var token = window.sessionStorage.getItem("token");

            console.log("token");
            console.log(token);
            console.log('登录');
            if (token == null) {
                this.router.navigate(["login"]);
            } else {
                ApiConfig.SetToken(token);
                this.enterpriseApi.employeeinfo({}).then((operator:any)=>{
                    console.log(operator,'operator')
                    if(operator==null || operator.enterprise_id=='0'){
                        this.router.navigate(["login"]);
                    }else{
                        this.operatorinfo=operator;
                        this.position = operator.position;
                        this.onMyShow();
                        this.update();
                        this.getquot();
                        setInterval(() => {
                
                        this.update();
                        this.getquot();
                
                        }, 20 * 1000);
                    }
                });
            }
        }
    }


    onMyLoad() {
        console.log('走了222222')
      
    }
    getInstInfo() {
        console.log('走了3333333')
        if (AppBase.InstInfo == null) {
            AppBase.instapi.info({}, false).then((instinfo) => {
                AppBase.InstInfo = instinfo;
                this.InstInfo = instinfo;
                console.log("地方撒地方", this.InstInfo);
            });
        } else {
            this.InstInfo = AppBase.InstInfo;
            console.log("地方撒地方", this.InstInfo);
        }
    }
    getMemberInfo() {

        
    }

   



    getResources() {
        console.log('看看走没走', AppBase.Resources)
        if (AppBase.Resources == null) {

            console.log('去去去');
            AppBase.instapi.resources({}, false).then((res) => {
                AppBase.Resources = res;
                this.res = res;
                console.log(this.res, '来来来');
            });

        } else {
            console.log(this.res, '来来来');
            this.res = AppBase.Resources;
        }
    }

    consolelog(vi, value) {
        console.log({ vi, value });
    }
    ionViewDidEnter() {
        console.log('走了444444444')
        AppComponent.Instance.currentpage = this.currentpage;
        this.consolelog("123132", this.currentpage);
        console.log(this.currentpage);
        if (TabsPage.Instance != null) {
            TabsPage.Instance.currentpage = this.currentpage;
        }

        AppBase.CurrentRoute = this.router;
        AppBase.CurrentNav = this.navCtrl;
        AppBase.Current = this;

        this.CheckPermission();
        // this.onMyShow();
        console.log('这屁了')
        
    }
   
    onMyShow() {
        console.log('走了55555555555')
    }


    onPullRefresh(ref) {
        this.onMyShow();
        setTimeout(() => { 
            ref.target.complete();
        }, 2000);
    }
    doRefresh(ref) {
        this.onPullRefresh(ref);
        // setTimeout(() => {
        //     ref.complete();
        // }, 1000);
    }
    onLoadMoreRefresh(ref) {
        ref.complete();
    }
    doInfinite(infiniteScroll) {
        this.onLoadMoreRefresh(infiniteScroll);
        // setTimeout(() => {
        //   infiniteScroll.complete();
        // }, 1000);
    }
    isbacking = false;
    back() {
        if (this.isbacking == true) {
            return;
        }
        this.isbacking = true;
        //alert(this.Params.fromtab);
        if (history.length < 2) {
            this.navCtrl.navigateBack('tabs/tab1');
            return;
        }
        if (this.params.fromtab != undefined) {
            this.navCtrl.navigateBack('tabs/' + this.params.fromtab);
        } else {
            this.navCtrl.back();
        }
    }
    backToUrl(url) {
        this.navCtrl.navigateBack(url);
    }
    close(data) {
        this.modalCtrl.dismiss(data);
    }
    returnData(data) {
        this.modalCtrl.dismiss(data);
    }
    windowslocation(url) {
        window.location.href = url;
    }
    navigate(pagename, param = {}, checkLogin = false) {
        if (checkLogin == true) {
            if (this.operatorinfo.id == 0) {
                this.navigate("login");
                return;
            }
        }
        this.router.navigate([pagename], { queryParams: param });

    }
    async showModal(pageobj, param = {}, callback = null) {

        var modal = await this.modalCtrl.create({
            component: pageobj,
            componentProps: param
        });
        await modal.onDidDismiss().then((data) => {
            if (callback != null) {
                callback(data);
            }
        });
        await modal.present();
    }

    showContent(title, key) {
        this.navigate("content", { title, key });
        //this.showModal("ContentPage", { title, key });
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
    async toast(msg) {
        if (msg == "") {
            return;
        }
        console.log(((msg.length / 3) + 1) * 1000);
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: ((msg.length / 3) + 1) * 500
        });
        toast.present();
    }
    async showAlert(msg,callback=undefined) {

        const alert = await this.alertCtrl.create({
            header: "提示",
            subHeader: msg,
            buttons: [{
                text: "确定",
                handler: () => {
                    if(callback!=undefined){
                        callback();
                    }
                }
            }]
        });
        alert.present();
        console.log('滴滴')
    }
    
    async showConfirm(msg, confirmcallback) {

        const alert = await this.alertCtrl.create({
            header: "提示",
            subHeader: msg,
            buttons: [{
                text: "取消",
                handler: () => {
                    console.log('Disagree clicked');

                    confirmcallback(false);
                }
            }, {
                text: "确定",
                handler: () => {
                    confirmcallback(true);
                }
            }]
        });
        alert.present();
    }
    async checkLogin(callback) {

    }

    async showActionSheet(actionSheetController, header, buttons) {
        const actionSheet = await actionSheetController.create({
            header: header,
            buttons: buttons
        });
        await actionSheet.present();
    }
    hasLogin() {
        return this.operatorinfo != null;
    }
    logout() {

        // window.localStorage.removeItem("UserToken");
        // this.MemberInfo = null;
       // AppBase.Lang[AppBase.langcode].quxiao
        this.showConfirm("确定退出登录？", (ret) => {
            if (ret) {
                AppBase.IsLogin = false;
                window.localStorage.removeItem("UserToken");
                window.localStorage.removeItem("user_id");
                window.localStorage.removeItem("isregister");
                this.operatorinfo = null;
                this.backToUrl('/login');
            }
        })

    }
    
 
    store(name, value = null) {
        if (value == null) {
            return window.localStorage.getItem(name);
        } else {
            window.localStorage.setItem(name, value);
            return "";
        }
    }


    splitRow(content) {
        return content.split("\n");
    }

    getMemberPhoto(photo: string) {
        if (photo == null || photo == undefined || photo.trim() == "") {
            return this.uploadpath + "inst/" + this.InstInfo.logo;
        } else {
            return this.uploadpath + "member/" + photo;
        }
    }

    logScrollStart() {
        console.log("logScrollStart");
    }
    logScrolling(e) {
        console.log(e);
        this.scrolltop = e.detail.scrollTop;
    }
    logScrollEnd() {
        console.log("logScrollEnd");
    }
    gotoDiv(id) {
        var target = document.querySelector('#' + id);
        target.scrollIntoView();
    }

    tryLogin() {
        this.showModal("LoginPage", {});
    }


    backHome() {
        this.navCtrl.navigateBack('tabs/tab1');
        return;
    }
    uploadImage(module, aa) {

    }
    backtotop() {
        //var bid=
    }

    // yyyy/mm/dd hh:mm:ss
    getchangedate(date) {
        return date.replace(/-/g, '/')
    }
    // yyyy/mm/dd
    getdate(date) {
        date = date.slice(0, date.length - 9)
        return date.replace(/-/g, '/')
    }

    // yyyy/mm/dd hh:mm
    getdatemm(date) {
        date = date.slice(0, date.length - 3)
        return date.replace(/-/g, '/')
    }

    // yyyy年mm月dd日 hh:mm
    getdatech(date) {
        let date1 = date.slice(0, 4)
        let date2 = date.slice(5, 7)
        let date3 = date.slice(8, 10)
        let date4 = date.slice(10, date.length - 3)
        return date1 + "年" + date2 + "月" + date3 + "日" + date4
        console.log(date1, date2, date3)
        // return date.replace(/-/g,'年')
    }

    // yy/mm/dd hh:mm 
    getchangedatetime(date) {
        date = date.slice(2, date.length - 3)
        return date.replace(/-/g, '/')
    }

    // mm/dd hh:mm
    getchangetime(date) {
        date = date.slice(5, date.length - 3)
        return date.replace(/-/g, '/')
    }

    getchangemonthtime(date) {
        date = date.slice(5, date.length - 3)
        return date
    }

    // dd-mm-yyyy
    getDate(date) {
        let arr = date.split('-')
        let newArr = []
        for (let i = 0; i < arr.length; i++) {
            newArr[arr.length - i] = arr[i]
        }

        return newArr.join("-").replace("-", '')
    }

    async uploadFile(transfer: FileTransfer, filepath: string, module: string) {
        filepath = filepath.split("?")[0];
        let options: FileUploadOptions = {
            fileKey: 'img',
            fileName: filepath
        }
        //alert(filepath);

        var fileTransfer: FileTransferObject = await transfer.create();
        return fileTransfer.upload(filepath, ApiConfig.getFileUploadAPI() + "?field=img&module=" + module, options)
            .then((data) => {
                // success
                //alert(data.response);
                return data.response.toString().split("|~~|")[1];
            }, (err) => {
                this.showModal("上传失败，请联系管理员");
                // error
            })
    }

    

    ngOnDestroy(): void {
        this.onMyUnload();
    }
    onMyUnload(){

    }

}