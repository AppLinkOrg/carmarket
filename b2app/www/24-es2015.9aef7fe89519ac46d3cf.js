(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{DDhW:function(l,n,u){"use strict";u.r(n);var e=u("8Y7J");class o{}var t=u("pMnS"),i=u("oBZk"),d=u("ZZ/e"),a=u("s7LF"),c=u("SVse"),s=u("oseM"),r=u("W2O4"),g=u("NbZn"),v=u("0LV4"),p=u("4wrl"),h=u("6l2z");class m extends p.a{constructor(l,n,u,e,o,t,i,d,a,c){super(l,n,u,e,o,t),this.router=l,this.navCtrl=n,this.modalCtrl=u,this.toastCtrl=e,this.alertCtrl=o,this.activeRoute=t,this.sanitizer=i,this.memberApi=d,this.deviceApi=a,this.phoneApi=c,this.deviceno="",this.deviceinfo=null,this.modellist=[],this.headerscroptshow=480}onMyLoad(){this.deviceno=this.params.deviceno}getDeviceInfo(){this.deviceApi.info({deviceno:this.deviceno}).then(l=>{this.deviceinfo=l})}aa(l){console.log(l)}onMyShow(){this.getDeviceInfo(),this.phoneApi.modellist({}).then(l=>{this.modellist=l})}send(l,n){new h.a("120.77.151.197","6123").SendForText("APP,"+this.deviceno+","+l+","+n,l=>{setTimeout(()=>{this.getDeviceInfo()},2e3)})}trycutter(){this.send("TRYCUT","")}}var f=u("iInd"),C=u("cUpR"),b=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function x(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,5,"div",[["class","flex-row flex-center"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,1,"div",[["class","flex-1"]],null,null,null,null,null)),(l()(),e["\u0275ted"](2,null,["",""])),(l()(),e["\u0275eld"](3,0,null,null,2,"ion-button",[],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.send("WRITE",l.context.$implicit.id)&&e),e}),i.u,i.b)),e["\u0275did"](4,49152,null,0,d.j,[e.ChangeDetectorRef,e.ElementRef,e.NgZone],null,null),(l()(),e["\u0275ted"](5,0,["",""]))],null,(function(l,n){var u=n.component;l(n,2,0,n.context.$implicit.modelname),l(n,5,0,u.lang.kelu)}))}function R(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,92,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,12,"div",[["class","flex-row flex-center"]],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,1,"div",[["class","txt-gray h7 margin-right"]],null,null,null,null,null)),(l()(),e["\u0275ted"](3,null,["",""])),(l()(),e["\u0275eld"](4,0,null,null,6,"div",[["class","flex-1 h7"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,5,"input",[["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var o=!0,t=l.component;return"input"===n&&(o=!1!==e["\u0275nov"](l,6)._handleInput(u.target.value)&&o),"blur"===n&&(o=!1!==e["\u0275nov"](l,6).onTouched()&&o),"compositionstart"===n&&(o=!1!==e["\u0275nov"](l,6)._compositionStart()&&o),"compositionend"===n&&(o=!1!==e["\u0275nov"](l,6)._compositionEnd(u.target.value)&&o),"ngModelChange"===n&&(o=!1!==(t.deviceinfo.speed=u)&&o),o}),null,null)),e["\u0275did"](6,16384,null,0,a.b,[e.Renderer2,e.ElementRef,[2,a.a]],null,null),e["\u0275prd"](1024,null,a.d,(function(l){return[l]}),[a.b]),e["\u0275did"](8,671744,null,0,a.g,[[8,null],[8,null],[8,null],[6,a.d]],{model:[0,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,a.e,null,[a.g]),e["\u0275did"](10,16384,null,0,a.f,[[4,a.e]],null,null),(l()(),e["\u0275eld"](11,0,null,null,2,"ion-button",[],null,[[null,"click"]],(function(l,n,u){var e=!0,o=l.component;return"click"===n&&(e=!1!==o.send("SPEED",o.deviceinfo.speed)&&e),e}),i.u,i.b)),e["\u0275did"](12,49152,null,0,d.j,[e.ChangeDetectorRef,e.ElementRef,e.NgZone],null,null),(l()(),e["\u0275ted"](13,0,["",""])),(l()(),e["\u0275eld"](14,0,null,null,12,"div",[["class","flex-row flex-center"]],null,null,null,null,null)),(l()(),e["\u0275eld"](15,0,null,null,1,"div",[["class","txt-gray h7 margin-right"]],null,null,null,null,null)),(l()(),e["\u0275ted"](16,null,["",""])),(l()(),e["\u0275eld"](17,0,null,null,6,"div",[["class","flex-1 h7"]],null,null,null,null,null)),(l()(),e["\u0275eld"](18,0,null,null,5,"input",[["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var o=!0,t=l.component;return"input"===n&&(o=!1!==e["\u0275nov"](l,19)._handleInput(u.target.value)&&o),"blur"===n&&(o=!1!==e["\u0275nov"](l,19).onTouched()&&o),"compositionstart"===n&&(o=!1!==e["\u0275nov"](l,19)._compositionStart()&&o),"compositionend"===n&&(o=!1!==e["\u0275nov"](l,19)._compositionEnd(u.target.value)&&o),"ngModelChange"===n&&(o=!1!==(t.deviceinfo.pressure=u)&&o),o}),null,null)),e["\u0275did"](19,16384,null,0,a.b,[e.Renderer2,e.ElementRef,[2,a.a]],null,null),e["\u0275prd"](1024,null,a.d,(function(l){return[l]}),[a.b]),e["\u0275did"](21,671744,null,0,a.g,[[8,null],[8,null],[8,null],[6,a.d]],{model:[0,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,a.e,null,[a.g]),e["\u0275did"](23,16384,null,0,a.f,[[4,a.e]],null,null),(l()(),e["\u0275eld"](24,0,null,null,2,"ion-button",[],null,[[null,"click"]],(function(l,n,u){var e=!0,o=l.component;return"click"===n&&(e=!1!==o.send("PRESSURE",o.deviceinfo.pressure)&&e),e}),i.u,i.b)),e["\u0275did"](25,49152,null,0,d.j,[e.ChangeDetectorRef,e.ElementRef,e.NgZone],null,null),(l()(),e["\u0275ted"](26,0,["",""])),(l()(),e["\u0275eld"](27,0,null,null,12,"div",[["class","flex-row flex-center"]],null,null,null,null,null)),(l()(),e["\u0275eld"](28,0,null,null,1,"div",[["class","txt-gray h7 margin-right"]],null,null,null,null,null)),(l()(),e["\u0275ted"](29,null,["",""])),(l()(),e["\u0275eld"](30,0,null,null,6,"div",[["class","flex-1 h7"]],null,null,null,null,null)),(l()(),e["\u0275eld"](31,0,null,null,5,"input",[["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var o=!0,t=l.component;return"input"===n&&(o=!1!==e["\u0275nov"](l,32)._handleInput(u.target.value)&&o),"blur"===n&&(o=!1!==e["\u0275nov"](l,32).onTouched()&&o),"compositionstart"===n&&(o=!1!==e["\u0275nov"](l,32)._compositionStart()&&o),"compositionend"===n&&(o=!1!==e["\u0275nov"](l,32)._compositionEnd(u.target.value)&&o),"ngModelChange"===n&&(o=!1!==(t.deviceinfo.gear=u)&&o),o}),null,null)),e["\u0275did"](32,16384,null,0,a.b,[e.Renderer2,e.ElementRef,[2,a.a]],null,null),e["\u0275prd"](1024,null,a.d,(function(l){return[l]}),[a.b]),e["\u0275did"](34,671744,null,0,a.g,[[8,null],[8,null],[8,null],[6,a.d]],{model:[0,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,a.e,null,[a.g]),e["\u0275did"](36,16384,null,0,a.f,[[4,a.e]],null,null),(l()(),e["\u0275eld"](37,0,null,null,2,"ion-button",[],null,[[null,"click"]],(function(l,n,u){var e=!0,o=l.component;return"click"===n&&(e=!1!==o.send("GEAR",o.deviceinfo.gear)&&e),e}),i.u,i.b)),e["\u0275did"](38,49152,null,0,d.j,[e.ChangeDetectorRef,e.ElementRef,e.NgZone],null,null),(l()(),e["\u0275ted"](39,0,["",""])),(l()(),e["\u0275eld"](40,0,null,null,12,"div",[["class","flex-row flex-center"]],null,null,null,null,null)),(l()(),e["\u0275eld"](41,0,null,null,1,"div",[["class","txt-gray h7 margin-right"]],null,null,null,null,null)),(l()(),e["\u0275ted"](42,null,["",""])),(l()(),e["\u0275eld"](43,0,null,null,6,"div",[["class","flex-1 h7"]],null,null,null,null,null)),(l()(),e["\u0275eld"](44,0,null,null,5,"input",[["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var o=!0,t=l.component;return"input"===n&&(o=!1!==e["\u0275nov"](l,45)._handleInput(u.target.value)&&o),"blur"===n&&(o=!1!==e["\u0275nov"](l,45).onTouched()&&o),"compositionstart"===n&&(o=!1!==e["\u0275nov"](l,45)._compositionStart()&&o),"compositionend"===n&&(o=!1!==e["\u0275nov"](l,45)._compositionEnd(u.target.value)&&o),"ngModelChange"===n&&(o=!1!==(t.deviceinfo.spacing=u)&&o),o}),null,null)),e["\u0275did"](45,16384,null,0,a.b,[e.Renderer2,e.ElementRef,[2,a.a]],null,null),e["\u0275prd"](1024,null,a.d,(function(l){return[l]}),[a.b]),e["\u0275did"](47,671744,null,0,a.g,[[8,null],[8,null],[8,null],[6,a.d]],{model:[0,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,a.e,null,[a.g]),e["\u0275did"](49,16384,null,0,a.f,[[4,a.e]],null,null),(l()(),e["\u0275eld"](50,0,null,null,2,"ion-button",[],null,[[null,"click"]],(function(l,n,u){var e=!0,o=l.component;return"click"===n&&(e=!1!==o.send("SPACING",o.deviceinfo.spacing)&&e),e}),i.u,i.b)),e["\u0275did"](51,49152,null,0,d.j,[e.ChangeDetectorRef,e.ElementRef,e.NgZone],null,null),(l()(),e["\u0275ted"](52,0,["",""])),(l()(),e["\u0275eld"](53,0,null,null,12,"div",[["class","flex-row flex-center "]],null,null,null,null,null)),(l()(),e["\u0275eld"](54,0,null,null,1,"div",[["class","txt-gray h7 margin-right"]],null,null,null,null,null)),(l()(),e["\u0275ted"](55,null,["",""])),(l()(),e["\u0275eld"](56,0,null,null,6,"div",[["class","flex-1 h7"]],null,null,null,null,null)),(l()(),e["\u0275eld"](57,0,null,null,5,"input",[["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var o=!0,t=l.component;return"input"===n&&(o=!1!==e["\u0275nov"](l,58)._handleInput(u.target.value)&&o),"blur"===n&&(o=!1!==e["\u0275nov"](l,58).onTouched()&&o),"compositionstart"===n&&(o=!1!==e["\u0275nov"](l,58)._compositionStart()&&o),"compositionend"===n&&(o=!1!==e["\u0275nov"](l,58)._compositionEnd(u.target.value)&&o),"ngModelChange"===n&&(o=!1!==(t.deviceinfo.width=u)&&o),o}),null,null)),e["\u0275did"](58,16384,null,0,a.b,[e.Renderer2,e.ElementRef,[2,a.a]],null,null),e["\u0275prd"](1024,null,a.d,(function(l){return[l]}),[a.b]),e["\u0275did"](60,671744,null,0,a.g,[[8,null],[8,null],[8,null],[6,a.d]],{model:[0,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,a.e,null,[a.g]),e["\u0275did"](62,16384,null,0,a.f,[[4,a.e]],null,null),(l()(),e["\u0275eld"](63,0,null,null,2,"ion-button",[],null,[[null,"click"]],(function(l,n,u){var e=!0,o=l.component;return"click"===n&&(e=!1!==o.send("WIDTH",o.deviceinfo.width)&&e),e}),i.u,i.b)),e["\u0275did"](64,49152,null,0,d.j,[e.ChangeDetectorRef,e.ElementRef,e.NgZone],null,null),(l()(),e["\u0275ted"](65,0,["",""])),(l()(),e["\u0275eld"](66,0,null,null,2,"div",[["class","flex-row flex-center "]],null,null,null,null,null)),(l()(),e["\u0275eld"](67,0,null,null,1,"div",[["class","flex-1 h7"]],null,null,null,null,null)),(l()(),e["\u0275ted"](68,null,["","",""])),(l()(),e["\u0275eld"](69,0,null,null,3,"div",[["class","margin-top"]],null,null,null,null,null)),(l()(),e["\u0275eld"](70,0,null,null,2,"ion-button",[["expand","block"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.trycutter()&&e),e}),i.u,i.b)),e["\u0275did"](71,49152,null,0,d.j,[e.ChangeDetectorRef,e.ElementRef,e.NgZone],{expand:[0,"expand"]},null),(l()(),e["\u0275ted"](72,0,["",""])),(l()(),e["\u0275eld"](73,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),e["\u0275eld"](74,0,null,null,4,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](75,0,null,null,1,"div",[["class","h7 txt-gray"]],null,null,null,null,null)),(l()(),e["\u0275ted"](76,null,["",""])),(l()(),e["\u0275and"](16777216,null,null,1,null,x)),e["\u0275did"](78,278528,null,0,c.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),e["\u0275eld"](79,0,null,null,1,"div",[["class","h7 txt-gray"]],null,null,null,null,null)),(l()(),e["\u0275ted"](80,null,["",""])),(l()(),e["\u0275eld"](81,0,null,null,3,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](82,0,null,null,2,"ion-button",[["expand","block"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.send("RESET",0)&&e),e}),i.u,i.b)),e["\u0275did"](83,49152,null,0,d.j,[e.ChangeDetectorRef,e.ElementRef,e.NgZone],{expand:[0,"expand"]},null),(l()(),e["\u0275ted"](84,0,["",""])),(l()(),e["\u0275eld"](85,0,null,null,3,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](86,0,null,null,2,"ion-button",[["expand","block"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.send("RESET",1)&&e),e}),i.u,i.b)),e["\u0275did"](87,49152,null,0,d.j,[e.ChangeDetectorRef,e.ElementRef,e.NgZone],{expand:[0,"expand"]},null),(l()(),e["\u0275ted"](88,0,["",""])),(l()(),e["\u0275eld"](89,0,null,null,3,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](90,0,null,null,2,"ion-button",[["expand","block"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.send("RESET",2)&&e),e}),i.u,i.b)),e["\u0275did"](91,49152,null,0,d.j,[e.ChangeDetectorRef,e.ElementRef,e.NgZone],{expand:[0,"expand"]},null),(l()(),e["\u0275ted"](92,0,["",""]))],(function(l,n){var u=n.component;l(n,8,0,u.deviceinfo.speed),l(n,21,0,u.deviceinfo.pressure),l(n,34,0,u.deviceinfo.gear),l(n,47,0,u.deviceinfo.spacing),l(n,60,0,u.deviceinfo.width),l(n,71,0,"block"),l(n,78,0,u.modellist),l(n,83,0,"block"),l(n,87,0,"block"),l(n,91,0,"block")}),(function(l,n){var u=n.component;l(n,3,0,u.lang.daosu),l(n,5,0,e["\u0275nov"](n,10).ngClassUntouched,e["\u0275nov"](n,10).ngClassTouched,e["\u0275nov"](n,10).ngClassPristine,e["\u0275nov"](n,10).ngClassDirty,e["\u0275nov"](n,10).ngClassValid,e["\u0275nov"](n,10).ngClassInvalid,e["\u0275nov"](n,10).ngClassPending),l(n,13,0,u.lang.xiugai),l(n,16,0,u.lang.daoya),l(n,18,0,e["\u0275nov"](n,23).ngClassUntouched,e["\u0275nov"](n,23).ngClassTouched,e["\u0275nov"](n,23).ngClassPristine,e["\u0275nov"](n,23).ngClassDirty,e["\u0275nov"](n,23).ngClassValid,e["\u0275nov"](n,23).ngClassInvalid,e["\u0275nov"](n,23).ngClassPending),l(n,26,0,u.lang.xiugai),l(n,29,0,u.lang.chulunbi),l(n,31,0,e["\u0275nov"](n,36).ngClassUntouched,e["\u0275nov"](n,36).ngClassTouched,e["\u0275nov"](n,36).ngClassPristine,e["\u0275nov"](n,36).ngClassDirty,e["\u0275nov"](n,36).ngClassValid,e["\u0275nov"](n,36).ngClassInvalid,e["\u0275nov"](n,36).ngClassPending),l(n,39,0,u.lang.xiugai),l(n,42,0,u.lang.xianwei),l(n,44,0,e["\u0275nov"](n,49).ngClassUntouched,e["\u0275nov"](n,49).ngClassTouched,e["\u0275nov"](n,49).ngClassPristine,e["\u0275nov"](n,49).ngClassDirty,e["\u0275nov"](n,49).ngClassValid,e["\u0275nov"](n,49).ngClassInvalid,e["\u0275nov"](n,49).ngClassPending),l(n,52,0,u.lang.xiugai),l(n,55,0,u.lang.fukuan),l(n,57,0,e["\u0275nov"](n,62).ngClassUntouched,e["\u0275nov"](n,62).ngClassTouched,e["\u0275nov"](n,62).ngClassPristine,e["\u0275nov"](n,62).ngClassDirty,e["\u0275nov"](n,62).ngClassValid,e["\u0275nov"](n,62).ngClassInvalid,e["\u0275nov"](n,62).ngClassPending),l(n,65,0,u.lang.xiugai),l(n,68,0,u.lang.gengxintime,u.deviceinfo.lastupdatetime),l(n,72,0,u.lang.shike),l(n,76,0,u.lang.kelu),l(n,80,0,u.lang.zhongzhi),l(n,84,0,u.lang.moshi0),l(n,88,0,u.lang.moshi1),l(n,92,0,u.lang.moshi2)}))}function k(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,9,"ion-header",[],null,null,null,i.x,i.e)),e["\u0275did"](1,49152,null,0,d.A,[e.ChangeDetectorRef,e.ElementRef,e.NgZone],null,null),(l()(),e["\u0275eld"](2,0,null,0,7,"ion-toolbar",[["class","border-bot"]],null,null,null,i.L,i.s)),e["\u0275did"](3,49152,null,0,d.Bb,[e.ChangeDetectorRef,e.ElementRef,e.NgZone],null,null),(l()(),e["\u0275eld"](4,0,null,0,5,"div",[["class","flex-row flex-center"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,0,"img",[["class","icon-back margin-left-20"]],[[8,"src",4]],[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.back()&&e),e}),null,null)),(l()(),e["\u0275eld"](6,0,null,null,2,"ion-title",[],null,null,null,i.J,i.q)),e["\u0275did"](7,49152,null,0,d.zb,[e.ChangeDetectorRef,e.ElementRef,e.NgZone],null,null),(l()(),e["\u0275ted"](8,0,["",""])),(l()(),e["\u0275eld"](9,0,null,null,0,"div",[["class","flex-1"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,21,"ion-content",[],null,null,null,i.w,i.d)),e["\u0275did"](11,49152,null,0,d.t,[e.ChangeDetectorRef,e.ElementRef,e.NgZone],null,null),(l()(),e["\u0275eld"](12,0,null,0,19,"div",[["class","padding"]],null,null,null,null,null)),(l()(),e["\u0275eld"](13,0,null,null,1,"div",[["class","h7 txt-gray"]],null,null,null,null,null)),(l()(),e["\u0275ted"](14,null,["",""])),(l()(),e["\u0275eld"](15,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](16,0,null,null,6,"ion-textarea",[["class","h6"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,u){var o=!0,t=l.component;return"ionBlur"===n&&(o=!1!==e["\u0275nov"](l,17)._handleBlurEvent(u.target)&&o),"ionChange"===n&&(o=!1!==e["\u0275nov"](l,17)._handleInputEvent(u.target)&&o),"ngModelChange"===n&&(o=!1!==(t.deviceno=u)&&o),o}),i.I,i.p)),e["\u0275did"](17,16384,null,0,d.Lb,[e.ElementRef],null,null),e["\u0275prd"](1024,null,a.d,(function(l){return[l]}),[d.Lb]),e["\u0275did"](19,671744,null,0,a.g,[[8,null],[8,null],[8,null],[6,a.d]],{model:[0,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,a.e,null,[a.g]),e["\u0275did"](21,16384,null,0,a.f,[[4,a.e]],null,null),e["\u0275did"](22,49152,null,0,d.xb,[e.ChangeDetectorRef,e.ElementRef,e.NgZone],null,null),(l()(),e["\u0275eld"](23,0,null,null,3,"div",[["class","margin-top"]],null,null,null,null,null)),(l()(),e["\u0275eld"](24,0,null,null,2,"ion-button",[["expand","block"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.send("SYNC","")&&e),e}),i.u,i.b)),e["\u0275did"](25,49152,null,0,d.j,[e.ChangeDetectorRef,e.ElementRef,e.NgZone],{expand:[0,"expand"]},null),(l()(),e["\u0275ted"](26,0,["",""])),(l()(),e["\u0275eld"](27,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),e["\u0275eld"](28,0,null,null,1,"div",[["class","h7 txt-gray"]],null,null,null,null,null)),(l()(),e["\u0275ted"](29,null,["",""])),(l()(),e["\u0275and"](16777216,null,null,1,null,R)),e["\u0275did"](31,16384,null,0,c.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){var u=n.component;l(n,19,0,u.deviceno),l(n,25,0,"block"),l(n,31,0,null!=u.deviceinfo)}),(function(l,n){var u=n.component;l(n,5,0,e["\u0275inlineInterpolate"](1,"",u.assets,"res/back.png")),l(n,8,0,u.lang.zhinengqiemo),l(n,14,0,u.lang.shebeihao),l(n,16,0,e["\u0275nov"](n,21).ngClassUntouched,e["\u0275nov"](n,21).ngClassTouched,e["\u0275nov"](n,21).ngClassPristine,e["\u0275nov"](n,21).ngClassDirty,e["\u0275nov"](n,21).ngClassValid,e["\u0275nov"](n,21).ngClassInvalid,e["\u0275nov"](n,21).ngClassPending),l(n,26,0,u.lang.shuaxinshuju),l(n,29,0,u.lang.shebeixinxi)}))}function E(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,4,"app-debugging",[],null,null,null,k,b)),e["\u0275prd"](512,null,s.a,s.a,[r.e]),e["\u0275prd"](512,null,g.a,g.a,[r.e]),e["\u0275prd"](512,null,v.a,v.a,[r.e]),e["\u0275did"](4,245760,null,0,m,[f.m,d.Hb,d.Gb,d.Mb,d.a,f.a,C.b,s.a,g.a,v.a],null,null)],(function(l,n){l(n,4,0)}),null)}var y=e["\u0275ccf"]("app-debugging",m,E,{},{},[]);class D{}u.d(n,"DebuggingPageModuleNgFactory",(function(){return I}));var I=e["\u0275cmf"](o,[],(function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[t.a,y]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,c.NgLocalization,c.NgLocaleLocalization,[e.LOCALE_ID,[2,c["\u0275angular_packages_common_common_a"]]]),e["\u0275mpd"](4608,a.i,a.i,[]),e["\u0275mpd"](4608,d.b,d.b,[e.NgZone,e.ApplicationRef]),e["\u0275mpd"](4608,d.Gb,d.Gb,[d.b,e.ComponentFactoryResolver,e.Injector]),e["\u0275mpd"](4608,d.Kb,d.Kb,[d.b,e.ComponentFactoryResolver,e.Injector]),e["\u0275mpd"](1073742336,c.CommonModule,c.CommonModule,[]),e["\u0275mpd"](1073742336,a.h,a.h,[]),e["\u0275mpd"](1073742336,a.c,a.c,[]),e["\u0275mpd"](1073742336,d.Db,d.Db,[]),e["\u0275mpd"](1073742336,f.n,f.n,[[2,f.s],[2,f.m]]),e["\u0275mpd"](1073742336,D,D,[]),e["\u0275mpd"](1073742336,o,o,[]),e["\u0275mpd"](1024,f.k,(function(){return[[{path:"",component:m}]]}),[])])}))}}]);