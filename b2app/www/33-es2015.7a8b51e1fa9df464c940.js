(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{ktQ3:function(l,n,e){"use strict";e.r(n);var u=e("8Y7J");class t{}var o=e("pMnS"),a=e("oBZk"),i=e("ZZ/e"),r=e("SVse"),d=e("s7LF"),c=e("oseM"),s=e("W2O4"),f=e("4wrl");class p extends f.a{constructor(l,n,e,u,t,o,a,i){super(l,n,e,u,t,o),this.router=l,this.navCtrl=n,this.modalCtrl=e,this.toastCtrl=u,this.alertCtrl=t,this.activeRoute=o,this.sanitizer=a,this.memberApi=i,this.check=0,this.types="",this.values=0,this.headerscroptshow=480}onMyLoad(){this.check=this.params.id}onMyShow(){}checks(l,n){this.memberApi.setmorendaoya({id:this.memberInfo.id,daoya:n,checking:l}).then(n=>{console.log(n),this.check=l})}changes(l,n){console.log(n,"\u89e6\u53d12222222",l),this.memberApi.setmorendaoya({type:"Y",id:this.memberInfo.id,daoya:l.detail.value,fenlei:n}).then(e=>{this.check==n&&this.memberApi.setmorendaoya({id:this.memberInfo.id,daoya:l.detail.value,checking:n}).then(l=>{console.log(l),this.check=n})})}setname(l,n){console.log("---",l.detail.value,n,"---"),this.memberApi.setmorendaoya({type:"K",id:this.memberInfo.id,daoya:l.detail.value,fenlei:n}).then(l=>{})}}var g=e("iInd"),m=e("cUpR"),h=u["\u0275crt"]({encapsulation:0,styles:[[".icons[_ngcontent-%COMP%]{width:7.24637681vw}.blocks2[_ngcontent-%COMP%]{margin:0 0 0 4.83091787vw;padding:2.41545894vw 0 4.83091787vw}.range-knob-min[_ngcontent-%COMP%]{--padding:0;--margin:rpx(10)}"]],data:{}});function v(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"img",[["class","icons margin-top-10"]],[[8,"src",4]],null,null,null,null))],null,(function(l,n){l(n,0,0,u["\u0275inlineInterpolate"](1,"",n.component.assets,"res/check.png"))}))}function b(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"img",[["class","icons margin-top-10"]],[[8,"src",4]],[[null,"click"]],(function(l,n,e){var u=!0,t=l.component;return"click"===n&&(u=!1!==t.checks(1,t.memberInfo.daoya1)&&u),u}),null,null))],null,(function(l,n){l(n,0,0,u["\u0275inlineInterpolate"](1,"",n.component.assets,"res/nocheck.png"))}))}function I(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"img",[["class","icons margin-top-10"]],[[8,"src",4]],null,null,null,null))],null,(function(l,n){l(n,0,0,u["\u0275inlineInterpolate"](1,"",n.component.assets,"res/check.png"))}))}function y(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"img",[["class","icons margin-top-10"]],[[8,"src",4]],[[null,"click"]],(function(l,n,e){var u=!0,t=l.component;return"click"===n&&(u=!1!==t.checks(2,t.memberInfo.daoya2)&&u),u}),null,null))],null,(function(l,n){l(n,0,0,u["\u0275inlineInterpolate"](1,"",n.component.assets,"res/nocheck.png"))}))}function C(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"img",[["class","icons margin-top-10"]],[[8,"src",4]],null,null,null,null))],null,(function(l,n){l(n,0,0,u["\u0275inlineInterpolate"](1,"",n.component.assets,"res/check.png"))}))}function R(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"img",[["class","icons margin-top-10"]],[[8,"src",4]],[[null,"click"]],(function(l,n,e){var u=!0,t=l.component;return"click"===n&&(u=!1!==t.checks(3,t.memberInfo.daoya3)&&u),u}),null,null))],null,(function(l,n){l(n,0,0,u["\u0275inlineInterpolate"](1,"",n.component.assets,"res/nocheck.png"))}))}function x(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"img",[["class","icons margin-top-10"]],[[8,"src",4]],null,null,null,null))],null,(function(l,n){l(n,0,0,u["\u0275inlineInterpolate"](1,"",n.component.assets,"res/check.png"))}))}function k(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"img",[["class","icons margin-top-10"]],[[8,"src",4]],[[null,"click"]],(function(l,n,e){var u=!0,t=l.component;return"click"===n&&(u=!1!==t.checks(4,t.memberInfo.daoya4)&&u),u}),null,null))],null,(function(l,n){l(n,0,0,u["\u0275inlineInterpolate"](1,"",n.component.assets,"res/nocheck.png"))}))}function _(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"img",[["class","icons margin-top-10"]],[[8,"src",4]],null,null,null,null))],null,(function(l,n){l(n,0,0,u["\u0275inlineInterpolate"](1,"",n.component.assets,"res/check.png"))}))}function E(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"img",[["class","icons margin-top-10"]],[[8,"src",4]],[[null,"click"]],(function(l,n,e){var u=!0,t=l.component;return"click"===n&&(u=!1!==t.checks(5,t.memberInfo.daoya5)&&u),u}),null,null))],null,(function(l,n){l(n,0,0,u["\u0275inlineInterpolate"](1,"",n.component.assets,"res/nocheck.png"))}))}function w(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,8,"ion-header",[],null,null,null,a.x,a.e)),u["\u0275did"](1,49152,null,0,i.A,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],null,null),(l()(),u["\u0275eld"](2,0,null,0,6,"ion-toolbar",[],null,null,null,a.L,a.s)),u["\u0275did"](3,49152,null,0,i.Bb,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],null,null),(l()(),u["\u0275eld"](4,0,null,0,4,"div",[["class","border-bot   "]],null,null,null,null,null)),(l()(),u["\u0275eld"](5,0,null,null,0,"img",[["class","icon-back margin-left-20"]],[[8,"src",4]],[[null,"click"]],(function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.back()&&u),u}),null,null)),(l()(),u["\u0275eld"](6,0,null,null,2,"ion-title",[],null,null,null,a.J,a.q)),u["\u0275did"](7,49152,null,0,i.zb,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],null,null),(l()(),u["\u0275ted"](8,0,["",""])),(l()(),u["\u0275eld"](9,0,null,null,101,"ion-content",[],null,null,null,a.w,a.d)),u["\u0275did"](10,49152,null,0,i.t,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],null,null),(l()(),u["\u0275eld"](11,0,null,0,19,"div",[["class","blocks2 flex-row flex-center border-bot"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,v)),u["\u0275did"](13,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,b)),u["\u0275did"](15,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275eld"](16,0,null,null,14,"div",[["class","flex-1 padding-left-20 padding-right-20"]],null,null,null,null,null)),(l()(),u["\u0275eld"](17,0,null,null,6,"div",[["class","flex-row flex-center"]],null,null,null,null,null)),(l()(),u["\u0275eld"](18,0,null,null,1,"div",[["class","h7_5"]],null,null,null,null,null)),(l()(),u["\u0275ted"](19,null,["",""])),(l()(),u["\u0275eld"](20,0,null,null,3,"ion-input",[["class","  h7_5 border-bot"],["type","text"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(l,n,e){var t=!0,o=l.component;return"ionBlur"===n&&(t=!1!==u["\u0275nov"](l,23)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u["\u0275nov"](l,23)._handleInputEvent(e.target)&&t),"ionChange"===n&&(t=!1!==o.setname(e,1)&&t),t}),a.A,a.h)),u["\u0275prd"](5120,null,d.d,(function(l){return[l]}),[i.Lb]),u["\u0275did"](22,49152,null,0,i.F,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],{type:[0,"type"],value:[1,"value"]},null),u["\u0275did"](23,16384,null,0,i.Lb,[u.ElementRef],null,null),(l()(),u["\u0275eld"](24,0,null,null,6,"div",[["class","flex-row flex-center"]],null,null,null,null,null)),(l()(),u["\u0275eld"](25,0,null,null,1,"div",[["class","h7_5"]],null,null,null,null,null)),(l()(),u["\u0275ted"](26,null,["",""])),(l()(),u["\u0275eld"](27,0,null,null,3,"ion-input",[["class","txt-blue  h7_5 border-bot"],["type","text"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(l,n,e){var t=!0,o=l.component;return"ionBlur"===n&&(t=!1!==u["\u0275nov"](l,30)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u["\u0275nov"](l,30)._handleInputEvent(e.target)&&t),"ionChange"===n&&(t=!1!==o.changes(e,1)&&t),t}),a.A,a.h)),u["\u0275prd"](5120,null,d.d,(function(l){return[l]}),[i.Lb]),u["\u0275did"](29,49152,null,0,i.F,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],{type:[0,"type"],value:[1,"value"]},null),u["\u0275did"](30,16384,null,0,i.Lb,[u.ElementRef],null,null),(l()(),u["\u0275eld"](31,0,null,0,19,"div",[["class","blocks2 flex-row flex-center border-bot"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,I)),u["\u0275did"](33,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,y)),u["\u0275did"](35,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275eld"](36,0,null,null,14,"div",[["class","flex-1 padding-left-20 padding-right-20"]],null,null,null,null,null)),(l()(),u["\u0275eld"](37,0,null,null,6,"div",[["class","flex-row flex-center"]],null,null,null,null,null)),(l()(),u["\u0275eld"](38,0,null,null,1,"div",[["class","h7_5"]],null,null,null,null,null)),(l()(),u["\u0275ted"](39,null,["",""])),(l()(),u["\u0275eld"](40,0,null,null,3,"ion-input",[["class","  h7_5 border-bot"],["type","text"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(l,n,e){var t=!0,o=l.component;return"ionBlur"===n&&(t=!1!==u["\u0275nov"](l,43)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u["\u0275nov"](l,43)._handleInputEvent(e.target)&&t),"ionChange"===n&&(t=!1!==o.setname(e,2)&&t),t}),a.A,a.h)),u["\u0275prd"](5120,null,d.d,(function(l){return[l]}),[i.Lb]),u["\u0275did"](42,49152,null,0,i.F,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],{type:[0,"type"],value:[1,"value"]},null),u["\u0275did"](43,16384,null,0,i.Lb,[u.ElementRef],null,null),(l()(),u["\u0275eld"](44,0,null,null,6,"div",[["class","flex-row flex-center"]],null,null,null,null,null)),(l()(),u["\u0275eld"](45,0,null,null,1,"div",[["class","h7_5"]],null,null,null,null,null)),(l()(),u["\u0275ted"](46,null,["",""])),(l()(),u["\u0275eld"](47,0,null,null,3,"ion-input",[["class"," txt-blue h7_5 border-bot"],["type","text"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(l,n,e){var t=!0,o=l.component;return"ionBlur"===n&&(t=!1!==u["\u0275nov"](l,50)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u["\u0275nov"](l,50)._handleInputEvent(e.target)&&t),"ionChange"===n&&(t=!1!==o.changes(e,2)&&t),t}),a.A,a.h)),u["\u0275prd"](5120,null,d.d,(function(l){return[l]}),[i.Lb]),u["\u0275did"](49,49152,null,0,i.F,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],{type:[0,"type"],value:[1,"value"]},null),u["\u0275did"](50,16384,null,0,i.Lb,[u.ElementRef],null,null),(l()(),u["\u0275eld"](51,0,null,0,19,"div",[["class","blocks2 flex-row flex-center border-bot"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,C)),u["\u0275did"](53,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,R)),u["\u0275did"](55,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275eld"](56,0,null,null,14,"div",[["class","flex-1 padding-left-20 padding-right-20"]],null,null,null,null,null)),(l()(),u["\u0275eld"](57,0,null,null,6,"div",[["class","flex-row flex-center"]],null,null,null,null,null)),(l()(),u["\u0275eld"](58,0,null,null,1,"div",[["class","h7_5"]],null,null,null,null,null)),(l()(),u["\u0275ted"](59,null,["",""])),(l()(),u["\u0275eld"](60,0,null,null,3,"ion-input",[["class","  h7_5 border-bot"],["type","text"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(l,n,e){var t=!0,o=l.component;return"ionBlur"===n&&(t=!1!==u["\u0275nov"](l,63)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u["\u0275nov"](l,63)._handleInputEvent(e.target)&&t),"ionChange"===n&&(t=!1!==o.setname(e,3)&&t),t}),a.A,a.h)),u["\u0275prd"](5120,null,d.d,(function(l){return[l]}),[i.Lb]),u["\u0275did"](62,49152,null,0,i.F,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],{type:[0,"type"],value:[1,"value"]},null),u["\u0275did"](63,16384,null,0,i.Lb,[u.ElementRef],null,null),(l()(),u["\u0275eld"](64,0,null,null,6,"div",[["class","flex-row flex-center"]],null,null,null,null,null)),(l()(),u["\u0275eld"](65,0,null,null,1,"div",[["class","h7_5"]],null,null,null,null,null)),(l()(),u["\u0275ted"](66,null,["",""])),(l()(),u["\u0275eld"](67,0,null,null,3,"ion-input",[["class","txt-blue  h7_5 border-bot"],["type","text"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(l,n,e){var t=!0,o=l.component;return"ionBlur"===n&&(t=!1!==u["\u0275nov"](l,70)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u["\u0275nov"](l,70)._handleInputEvent(e.target)&&t),"ionChange"===n&&(t=!1!==o.changes(e,3)&&t),t}),a.A,a.h)),u["\u0275prd"](5120,null,d.d,(function(l){return[l]}),[i.Lb]),u["\u0275did"](69,49152,null,0,i.F,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],{type:[0,"type"],value:[1,"value"]},null),u["\u0275did"](70,16384,null,0,i.Lb,[u.ElementRef],null,null),(l()(),u["\u0275eld"](71,0,null,0,19,"div",[["class","blocks2 flex-row flex-center border-bot"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,x)),u["\u0275did"](73,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,k)),u["\u0275did"](75,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275eld"](76,0,null,null,14,"div",[["class","flex-1 padding-left-20 padding-right-20"]],null,null,null,null,null)),(l()(),u["\u0275eld"](77,0,null,null,6,"div",[["class","flex-row flex-center"]],null,null,null,null,null)),(l()(),u["\u0275eld"](78,0,null,null,1,"div",[["class","h7_5"]],null,null,null,null,null)),(l()(),u["\u0275ted"](79,null,["",""])),(l()(),u["\u0275eld"](80,0,null,null,3,"ion-input",[["class","  h7_5 border-bot"],["type","text"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(l,n,e){var t=!0,o=l.component;return"ionBlur"===n&&(t=!1!==u["\u0275nov"](l,83)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u["\u0275nov"](l,83)._handleInputEvent(e.target)&&t),"ionChange"===n&&(t=!1!==o.setname(e,4)&&t),t}),a.A,a.h)),u["\u0275prd"](5120,null,d.d,(function(l){return[l]}),[i.Lb]),u["\u0275did"](82,49152,null,0,i.F,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],{type:[0,"type"],value:[1,"value"]},null),u["\u0275did"](83,16384,null,0,i.Lb,[u.ElementRef],null,null),(l()(),u["\u0275eld"](84,0,null,null,6,"div",[["class","flex-row flex-center"]],null,null,null,null,null)),(l()(),u["\u0275eld"](85,0,null,null,1,"div",[["class","h7_5"]],null,null,null,null,null)),(l()(),u["\u0275ted"](86,null,["",""])),(l()(),u["\u0275eld"](87,0,null,null,3,"ion-input",[["class","txt-blue  h7_5 border-bot"],["type","text"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(l,n,e){var t=!0,o=l.component;return"ionBlur"===n&&(t=!1!==u["\u0275nov"](l,90)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u["\u0275nov"](l,90)._handleInputEvent(e.target)&&t),"ionChange"===n&&(t=!1!==o.changes(e,4)&&t),t}),a.A,a.h)),u["\u0275prd"](5120,null,d.d,(function(l){return[l]}),[i.Lb]),u["\u0275did"](89,49152,null,0,i.F,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],{type:[0,"type"],value:[1,"value"]},null),u["\u0275did"](90,16384,null,0,i.Lb,[u.ElementRef],null,null),(l()(),u["\u0275eld"](91,0,null,0,19,"div",[["class","blocks2 flex-row flex-center border-bot"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,_)),u["\u0275did"](93,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,E)),u["\u0275did"](95,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275eld"](96,0,null,null,14,"div",[["class","flex-1 padding-left-20 padding-right-20"]],null,null,null,null,null)),(l()(),u["\u0275eld"](97,0,null,null,6,"div",[["class","flex-row flex-center"]],null,null,null,null,null)),(l()(),u["\u0275eld"](98,0,null,null,1,"div",[["class","h7_5"]],null,null,null,null,null)),(l()(),u["\u0275ted"](99,null,["",""])),(l()(),u["\u0275eld"](100,0,null,null,3,"ion-input",[["class"," h7_5 border-bot"],["type","text"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(l,n,e){var t=!0,o=l.component;return"ionBlur"===n&&(t=!1!==u["\u0275nov"](l,103)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u["\u0275nov"](l,103)._handleInputEvent(e.target)&&t),"ionChange"===n&&(t=!1!==o.setname(e,5)&&t),t}),a.A,a.h)),u["\u0275prd"](5120,null,d.d,(function(l){return[l]}),[i.Lb]),u["\u0275did"](102,49152,null,0,i.F,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],{type:[0,"type"],value:[1,"value"]},null),u["\u0275did"](103,16384,null,0,i.Lb,[u.ElementRef],null,null),(l()(),u["\u0275eld"](104,0,null,null,6,"div",[["class","flex-row flex-center"]],null,null,null,null,null)),(l()(),u["\u0275eld"](105,0,null,null,1,"div",[["class","h7_5"]],null,null,null,null,null)),(l()(),u["\u0275ted"](106,null,["",""])),(l()(),u["\u0275eld"](107,0,null,null,3,"ion-input",[["class","txt-blue  h7_5 border-bot"],["type","text"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(l,n,e){var t=!0,o=l.component;return"ionBlur"===n&&(t=!1!==u["\u0275nov"](l,110)._handleBlurEvent(e.target)&&t),"ionChange"===n&&(t=!1!==u["\u0275nov"](l,110)._handleInputEvent(e.target)&&t),"ionChange"===n&&(t=!1!==o.changes(e,5)&&t),t}),a.A,a.h)),u["\u0275prd"](5120,null,d.d,(function(l){return[l]}),[i.Lb]),u["\u0275did"](109,49152,null,0,i.F,[u.ChangeDetectorRef,u.ElementRef,u.NgZone],{type:[0,"type"],value:[1,"value"]},null),u["\u0275did"](110,16384,null,0,i.Lb,[u.ElementRef],null,null)],(function(l,n){var e=n.component;l(n,13,0,1==e.check),l(n,15,0,1!=e.check),l(n,22,0,"text",u["\u0275inlineInterpolate"](1,"",e.memberInfo.daoyaname1,"")),l(n,29,0,"text",u["\u0275inlineInterpolate"](1,"",e.memberInfo.daoya1,"")),l(n,33,0,2==e.check),l(n,35,0,2!=e.check),l(n,42,0,"text",u["\u0275inlineInterpolate"](1,"",e.memberInfo.daoyaname2,"")),l(n,49,0,"text",u["\u0275inlineInterpolate"](1,"",e.memberInfo.daoya2,"")),l(n,53,0,3==e.check),l(n,55,0,3!=e.check),l(n,62,0,"text",u["\u0275inlineInterpolate"](1,"",e.memberInfo.daoyaname3,"")),l(n,69,0,"text",u["\u0275inlineInterpolate"](1,"",e.memberInfo.daoya3,"")),l(n,73,0,4==e.check),l(n,75,0,4!=e.check),l(n,82,0,"text",u["\u0275inlineInterpolate"](1,"",e.memberInfo.daoyaname4,"")),l(n,89,0,"text",u["\u0275inlineInterpolate"](1,"",e.memberInfo.daoya5,"")),l(n,93,0,5==e.check),l(n,95,0,5!=e.check),l(n,102,0,"text",u["\u0275inlineInterpolate"](1,"",e.memberInfo.daoyaname5,"")),l(n,109,0,"text",u["\u0275inlineInterpolate"](1,"",e.memberInfo.daoya5,""))}),(function(l,n){var e=n.component;l(n,5,0,u["\u0275inlineInterpolate"](1,"",e.assets,"res/back.png")),l(n,8,0,e.lang.setdaoya),l(n,19,0,e.lang.daoyaname1),l(n,26,0,e.lang.shuzhi),l(n,39,0,e.lang.daoyaname2),l(n,46,0,e.lang.shuzhi),l(n,59,0,e.lang.daoyaname3),l(n,66,0,e.lang.shuzhi),l(n,79,0,e.lang.daoyaname4),l(n,86,0,e.lang.shuzhi),l(n,99,0,e.lang.daoyaname5),l(n,106,0,e.lang.shuzhi)}))}function B(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,2,"app-setdaoya",[],null,null,null,w,h)),u["\u0275prd"](512,null,c.a,c.a,[s.e]),u["\u0275did"](2,245760,null,0,p,[g.m,i.Hb,i.Gb,i.Mb,i.a,g.a,m.b,c.a],null,null)],(function(l,n){l(n,2,0)}),null)}var N=u["\u0275ccf"]("app-setdaoya",p,B,{},{},[]);class L{}e.d(n,"SetdaoyaPageModuleNgFactory",(function(){return A}));var A=u["\u0275cmf"](t,[],(function(l){return u["\u0275mod"]([u["\u0275mpd"](512,u.ComponentFactoryResolver,u["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,N]],[3,u.ComponentFactoryResolver],u.NgModuleRef]),u["\u0275mpd"](4608,r.NgLocalization,r.NgLocaleLocalization,[u.LOCALE_ID,[2,r["\u0275angular_packages_common_common_a"]]]),u["\u0275mpd"](4608,d.i,d.i,[]),u["\u0275mpd"](4608,i.b,i.b,[u.NgZone,u.ApplicationRef]),u["\u0275mpd"](4608,i.Gb,i.Gb,[i.b,u.ComponentFactoryResolver,u.Injector]),u["\u0275mpd"](4608,i.Kb,i.Kb,[i.b,u.ComponentFactoryResolver,u.Injector]),u["\u0275mpd"](1073742336,r.CommonModule,r.CommonModule,[]),u["\u0275mpd"](1073742336,d.h,d.h,[]),u["\u0275mpd"](1073742336,d.c,d.c,[]),u["\u0275mpd"](1073742336,i.Db,i.Db,[]),u["\u0275mpd"](1073742336,g.n,g.n,[[2,g.s],[2,g.m]]),u["\u0275mpd"](1073742336,L,L,[]),u["\u0275mpd"](1073742336,t,t,[]),u["\u0275mpd"](1024,g.k,(function(){return[[{path:"",component:p}]]}),[])])}))}}]);