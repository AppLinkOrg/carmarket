(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{fl69:function(l,n,e){"use strict";e.r(n);var t=e("8Y7J");class u{}var i=e("pMnS"),o=e("oBZk"),a=e("s7LF"),d=e("ZZ/e"),r=e("SVse"),c=e("oseM"),s=e("W2O4"),p=e("NbZn"),h=e("4wrl");class v extends h.a{constructor(l,n,e,t,u,i,o,a,d){super(l,n,e,t,u,i),this.router=l,this.navCtrl=n,this.modalCtrl=e,this.toastCtrl=t,this.alertCtrl=u,this.activeRoute=i,this.sanitizer=o,this.memberApi=a,this.deviceApi=d,this.value1=0,this.value2=0,this.device=null,this.online=!1,this.headerscroptshow=480}onMyLoad(){}onMyShow(){this.memberApi.accountinfo({id:this.user_id}).then(l=>{this.deviceApi.info({deviceno:l.device_deviceno}).then(l=>{this.device=l;var n=this.device.gear.split(",");this.value1=parseInt(n[0]),this.value2=parseInt(n[1])}),this.sendTCP(l.device_deviceno,"SYNCSTATUS","",l=>{var n=l.split("|");this.online="OK"==n[0]})})}changes(l,n){this.value1=l.detail.value,console.log(n,"\u89e6\u53d1",l),this.set(this.value1,"P")}changes2(l,n){this.value2=l.detail.value,console.log(n,"\u89e6\u53d1",l),this.set(this.value2,"R")}set(l,n){this.memberApi.setmorendaoya({type:n,id:this.memberInfo.id,axis:l}).then(l=>{})}update(){this.sendTCP(this.device.deviceno,"GEAR",this.value1.toString()+","+this.value2.toString(),l=>{"OK"==l.split("|")[0]&&this.toast("\u4fee\u6539\u9f7f\u8f6e\u6bd4\u6210\u529f")})}}var g=e("iInd"),m=e("cUpR"),f=t["\u0275crt"]({encapsulation:0,styles:[[".blocks2[_ngcontent-%COMP%]{margin:0 0 0 4.83091787vw;padding:2.41545894vw 0 4.83091787vw}.range-knob-min[_ngcontent-%COMP%]{--padding:0;width:2.41545894vw!important;height:2.41545894vw!important}"]],data:{}});function b(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"div",[],null,null,null,null,null)),(l()(),t["\u0275ted"](1,null,[" "," "]))],null,(function(l,n){l(n,1,0,n.component.lang.nobang)}))}function C(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"div",[],null,null,null,null,null)),(l()(),t["\u0275ted"](1,null,[" "," "]))],null,(function(l,n){l(n,1,0,n.component.lang.shebeilixian)}))}function R(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,6,"div",[["class","blocks2 flex-row flex-center border-bot"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,1,"div",[["class","h8 flex-1   margin-top-10"]],null,null,null,null,null)),(l()(),t["\u0275ted"](2,null,["",""])),(l()(),t["\u0275eld"](3,0,null,null,3,"ion-input",[["class"," txt-blue h7_5 border-bot margin-right-10 text-right"],["type","text"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(l,n,e){var u=!0,i=l.component;return"ionBlur"===n&&(u=!1!==t["\u0275nov"](l,6)._handleBlurEvent(e.target)&&u),"ionChange"===n&&(u=!1!==t["\u0275nov"](l,6)._handleInputEvent(e.target)&&u),"ionChange"===n&&(i.changes(e,1),u=!1!==i.update()&&u),u}),o.A,o.h)),t["\u0275prd"](5120,null,a.d,(function(l){return[l]}),[d.Lb]),t["\u0275did"](5,49152,null,0,d.F,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{type:[0,"type"],value:[1,"value"]},null),t["\u0275did"](6,16384,null,0,d.Lb,[t.ElementRef],null,null)],(function(l,n){l(n,5,0,"text",t["\u0275inlineInterpolate"](1,"",n.component.value1,""))}),(function(l,n){l(n,2,0,n.component.lang.xzhou)}))}function w(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,8,"ion-header",[],null,null,null,o.x,o.e)),t["\u0275did"](1,49152,null,0,d.A,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](2,0,null,0,6,"ion-toolbar",[],null,null,null,o.L,o.s)),t["\u0275did"](3,49152,null,0,d.Bb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](4,0,null,0,4,"div",[["class","border-bot   "]],null,null,null,null,null)),(l()(),t["\u0275eld"](5,0,null,null,0,"img",[["class","icon-back margin-left-20"]],[[8,"src",4]],[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.back()&&t),t}),null,null)),(l()(),t["\u0275eld"](6,0,null,null,2,"ion-title",[],null,null,null,o.J,o.q)),t["\u0275did"](7,49152,null,0,d.zb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](8,0,["",""])),(l()(),t["\u0275eld"](9,0,null,null,14,"ion-content",[],null,null,null,o.w,o.d)),t["\u0275did"](10,49152,null,0,d.t,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275and"](16777216,null,0,1,null,b)),t["\u0275did"](12,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,0,1,null,C)),t["\u0275did"](14,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,0,1,null,R)),t["\u0275did"](16,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](17,0,null,0,6,"div",[["class","blocks2 flex-row flex-center border-bot"]],null,null,null,null,null)),(l()(),t["\u0275eld"](18,0,null,null,1,"div",[["class","h8 flex-1   margin-top-10"]],null,null,null,null,null)),(l()(),t["\u0275ted"](19,null,["",""])),(l()(),t["\u0275eld"](20,0,null,null,3,"ion-input",[["class"," txt-blue h7_5 border-bot margin-right-10 text-right"],["type","text"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(l,n,e){var u=!0,i=l.component;return"ionBlur"===n&&(u=!1!==t["\u0275nov"](l,23)._handleBlurEvent(e.target)&&u),"ionChange"===n&&(u=!1!==t["\u0275nov"](l,23)._handleInputEvent(e.target)&&u),"ionChange"===n&&(i.changes2(e,2),u=!1!==i.update()&&u),u}),o.A,o.h)),t["\u0275prd"](5120,null,a.d,(function(l){return[l]}),[d.Lb]),t["\u0275did"](22,49152,null,0,d.F,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{type:[0,"type"],value:[1,"value"]},null),t["\u0275did"](23,16384,null,0,d.Lb,[t.ElementRef],null,null)],(function(l,n){var e=n.component;l(n,12,0,null==e.device),l(n,14,0,null!=e.device&&0==e.online),l(n,16,0,null!=e.device&&1==e.online),l(n,22,0,"text",t["\u0275inlineInterpolate"](1,"",e.value2,""))}),(function(l,n){var e=n.component;l(n,5,0,t["\u0275inlineInterpolate"](1,"",e.assets,"res/back.png")),l(n,8,0,e.lang.setchilunbi),l(n,19,0,e.lang.yzhou)}))}function I(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,3,"app-setchilunbi",[],null,null,null,w,f)),t["\u0275prd"](512,null,c.a,c.a,[s.e]),t["\u0275prd"](512,null,p.a,p.a,[s.e]),t["\u0275did"](3,245760,null,0,v,[g.m,d.Hb,d.Gb,d.Mb,d.a,g.a,m.b,c.a,p.a],null,null)],(function(l,n){l(n,3,0)}),null)}var x=t["\u0275ccf"]("app-setchilunbi",v,I,{},{},[]);class y{}e.d(n,"SetchilunbiPageModuleNgFactory",(function(){return N}));var N=t["\u0275cmf"](u,[],(function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,x]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,r.NgLocalization,r.NgLocaleLocalization,[t.LOCALE_ID,[2,r["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,a.i,a.i,[]),t["\u0275mpd"](4608,d.b,d.b,[t.NgZone,t.ApplicationRef]),t["\u0275mpd"](4608,d.Gb,d.Gb,[d.b,t.ComponentFactoryResolver,t.Injector]),t["\u0275mpd"](4608,d.Kb,d.Kb,[d.b,t.ComponentFactoryResolver,t.Injector]),t["\u0275mpd"](1073742336,r.CommonModule,r.CommonModule,[]),t["\u0275mpd"](1073742336,a.h,a.h,[]),t["\u0275mpd"](1073742336,a.c,a.c,[]),t["\u0275mpd"](1073742336,d.Db,d.Db,[]),t["\u0275mpd"](1073742336,g.n,g.n,[[2,g.s],[2,g.m]]),t["\u0275mpd"](1073742336,y,y,[]),t["\u0275mpd"](1073742336,u,u,[]),t["\u0275mpd"](1024,g.k,(function(){return[[{path:"",component:v}]]}),[])])}))}}]);