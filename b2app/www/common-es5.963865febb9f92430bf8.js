(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"0LV4":function(t,n,e){"use strict";e.d(n,"a",(function(){return i}));var r=e("sE5F"),o=e("CSSQ"),i=function(){function t(t){this.http=t}return t.prototype.addjilu=function(t,n){void 0===n&&(n=!0);var e=o.a.getApiUrl()+"phone/addjilu",i=o.a.GetHeader(e,t),a=new r.g({headers:i}),s=o.a.ParamUrlencoded(t);return n&&o.a.GetLoadingModal(),this.http.post(e,s,a).toPromise().then((function(e){return o.a.DataLoadedHandle("phone/addjilu",t,e)?(n&&o.a.DimissLoadingModal(),null==e?null:e.json()):Promise.reject(e)})).catch((function(e){return n&&o.a.DimissLoadingModal(),o.a.ErrorHandle("phone/addjilu",t,e)}))},t.prototype.brandlist=function(t,n){void 0===n&&(n=!0);var e=o.a.getApiUrl()+"phone/brandlist",i=o.a.GetHeader(e,t),a=new r.g({headers:i}),s=o.a.ParamUrlencoded(t);return n&&o.a.GetLoadingModal(),this.http.post(e,s,a).toPromise().then((function(e){return o.a.DataLoadedHandle("phone/brandlist",t,e)?(n&&o.a.DimissLoadingModal(),null==e?null:e.json()):Promise.reject(e)})).catch((function(e){return n&&o.a.DimissLoadingModal(),o.a.ErrorHandle("phone/brandlist",t,e)}))},t.prototype.classifylist=function(t,n){void 0===n&&(n=!0);var e=o.a.getApiUrl()+"phone/classifylist",i=o.a.GetHeader(e,t),a=new r.g({headers:i}),s=o.a.ParamUrlencoded(t);return n&&o.a.GetLoadingModal(),this.http.post(e,s,a).toPromise().then((function(e){return o.a.DataLoadedHandle("phone/classifylist",t,e)?(n&&o.a.DimissLoadingModal(),null==e?null:e.json()):Promise.reject(e)})).catch((function(e){return n&&o.a.DimissLoadingModal(),o.a.ErrorHandle("phone/classifylist",t,e)}))},t.prototype.daoyalist=function(t,n){void 0===n&&(n=!0);var e=o.a.getApiUrl()+"phone/daoyalist",i=o.a.GetHeader(e,t),a=new r.g({headers:i}),s=o.a.ParamUrlencoded(t);return n&&o.a.GetLoadingModal(),this.http.post(e,s,a).toPromise().then((function(e){return o.a.DataLoadedHandle("phone/daoyalist",t,e)?(n&&o.a.DimissLoadingModal(),null==e?null:e.json()):Promise.reject(e)})).catch((function(e){return n&&o.a.DimissLoadingModal(),o.a.ErrorHandle("phone/daoyalist",t,e)}))},t.prototype.jilulist=function(t,n){void 0===n&&(n=!0);var e=o.a.getApiUrl()+"phone/jilulist",i=o.a.GetHeader(e,t),a=new r.g({headers:i}),s=o.a.ParamUrlencoded(t);return n&&o.a.GetLoadingModal(),this.http.post(e,s,a).toPromise().then((function(e){return o.a.DataLoadedHandle("phone/jilulist",t,e)?(n&&o.a.DimissLoadingModal(),null==e?null:e.json()):Promise.reject(e)})).catch((function(e){return n&&o.a.DimissLoadingModal(),o.a.ErrorHandle("phone/jilulist",t,e)}))},t.prototype.modelinfo=function(t,n){void 0===n&&(n=!0);var e=o.a.getApiUrl()+"phone/modelinfo",i=o.a.GetHeader(e,t),a=new r.g({headers:i}),s=o.a.ParamUrlencoded(t);return n&&o.a.GetLoadingModal(),this.http.post(e,s,a).toPromise().then((function(e){return o.a.DataLoadedHandle("phone/modelinfo",t,e)?(n&&o.a.DimissLoadingModal(),null==e?null:e.json()):Promise.reject(e)})).catch((function(e){return n&&o.a.DimissLoadingModal(),o.a.ErrorHandle("phone/modelinfo",t,e)}))},t.prototype.modellist=function(t,n){void 0===n&&(n=!0);var e=o.a.getApiUrl()+"phone/modellist",i=o.a.GetHeader(e,t),a=new r.g({headers:i}),s=o.a.ParamUrlencoded(t);return n&&o.a.GetLoadingModal(),this.http.post(e,s,a).toPromise().then((function(e){return o.a.DataLoadedHandle("phone/modellist",t,e)?(n&&o.a.DimissLoadingModal(),null==e?null:e.json()):Promise.reject(e)})).catch((function(e){return n&&o.a.DimissLoadingModal(),o.a.ErrorHandle("phone/modellist",t,e)}))},t}()},"DK3/":function(t,n,e){"use strict";e.d(n,"a",(function(){return o})),e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"d",(function(){return r}));var r=function(){var t=window.TapticEngine;t&&t.selection()},o=function(){var t=window.TapticEngine;t&&t.gestureSelectionStart()},i=function(){var t=window.TapticEngine;t&&t.gestureSelectionChanged()},a=function(){var t=window.TapticEngine;t&&t.gestureSelectionEnd()}},Jky2:function(t,n,e){"use strict";e.d(n,"a",(function(){return i})),e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return o})),e.d(n,"d",(function(){return u}));var r=e("mrSG"),o=function(t,n){return null!==n.closest(t)},i=function(t){var n;return"string"==typeof t&&t.length>0?((n={"ion-color":!0})["ion-color-"+t]=!0,n):void 0},a=function(t){var n={};return function(t){return void 0!==t?(Array.isArray(t)?t:t.split(" ")).filter((function(t){return null!=t})).map((function(t){return t.trim()})).filter((function(t){return""!==t})):[]}(t).forEach((function(t){return n[t]=!0})),n},s=/^[a-z][a-z0-9+\-.]*:/,u=function(t,n,e){return Object(r.__awaiter)(void 0,void 0,void 0,(function(){var o;return Object(r.__generator)(this,(function(r){return null!=t&&"#"!==t[0]&&!s.test(t)&&(o=document.querySelector("ion-router"))?(null!=n&&n.preventDefault(),[2,o.push(t,e)]):[2,!1]}))}))}},NTBD:function(t,n,e){"use strict";e.d(n,"a",(function(){return i})),e.d(n,"b",(function(){return r}));var r=function(t,n,e){var r=new MutationObserver((function(t){e(o(t,n))}));return r.observe(t,{childList:!0,subtree:!0}),r},o=function(t,n){var e;return t.forEach((function(t){for(var r=0;r<t.addedNodes.length;r++)e=i(t.addedNodes[r],n)||e})),e},i=function(t,n){if(1===t.nodeType)return(t.tagName===n.toUpperCase()?[t]:Array.from(t.querySelectorAll(n))).find((function(t){return!0===t.checked}))}},NbZn:function(t,n,e){"use strict";e.d(n,"a",(function(){return i}));var r=e("sE5F"),o=e("CSSQ"),i=function(){function t(t){this.http=t}return t.prototype.info=function(t,n){void 0===n&&(n=!0);var e=o.a.getApiUrl()+"device/info",i=o.a.GetHeader(e,t),a=new r.g({headers:i}),s=o.a.ParamUrlencoded(t);return n&&o.a.GetLoadingModal(),this.http.post(e,s,a).toPromise().then((function(e){return o.a.DataLoadedHandle("device/info",t,e)?(n&&o.a.DimissLoadingModal(),null==e?null:e.json()):Promise.reject(e)})).catch((function(e){return n&&o.a.DimissLoadingModal(),o.a.ErrorHandle("device/info",t,e)}))},t}()},OnTD:function(t,n,e){"use strict";e.d(n,"a",(function(){return r}));var r=function(){function t(t){this.connector=t}return t.prototype.readSpeed=function(n,e){var r=this,o=[];o.push(t.READSPEED[0]),o.push(0),o.push(t.READSPEED[1]),o.push(0),o.push(0),this.send(o,(function(t){var e={machinestatus:t[7],resultcode:t[8],speed:r.getNumber2(t[9],t[10])};n(e),r.close()}),(function(t){e(t),r.close()}))},t.prototype.setSpeed=function(n,e,r){var o=this,i=this.convertNumber(n,4),a=[];a.push(t.SETSPEED[0]),a.push(0),a.push(t.SETSPEED[1]),a.push(2),a.push(0),a.push(i[0]),a.push(i[1]),this.send(a,(function(t){e({machinestatus:t[7],resultcode:t[8]})}),(function(t){r(t),o.close()}))},t.prototype.readBladePressure=function(n,e){var r=this,o=[];o.push(t.READBLADEPRESS[0]),o.push(0),o.push(t.READBLADEPRESS[1]),o.push(0),o.push(0),this.send(o,(function(t){var e={machinestatus:t[7],resultcode:t[8],pressure:r.getNumber2(t[9],t[10])};n(e)}),(function(t){e(t),r.close()}))},t.prototype.setBladePressure=function(n,e,r){var o=this,i=this.convertNumber(n,4),a=[];a.push(t.SETBLADEPRESS[0]),a.push(0),a.push(t.SETBLADEPRESS[1]),a.push(2),a.push(0),a.push(i[0]),a.push(i[1]),this.send(a,(function(t){e({machinestatus:t[7],resultcode:t[8]})}),(function(t){r(t),o.close()}))},t.prototype.readGearRate=function(n,e){var r=this,o=[];o.push(t.READGEARRATE[0]),o.push(0),o.push(t.READGEARRATE[1]),o.push(0),o.push(0),this.send(o,(function(t){var e={machinestatus:t[7],resultcode:t[8],xrate:r.getNumber2(t[9],t[10]),yrate:r.getNumber2(t[11],t[12])};n(e)}),(function(t){e(t),r.close()}))},t.prototype.setGearRate=function(n,e,r,o){var i=this,a=this.convertNumber(n,4),s=this.convertNumber(e,4),u=[];u.push(t.SETGEARRATE[0]),u.push(0),u.push(t.SETGEARRATE[1]),u.push(4),u.push(0),u.push(a[0]),u.push(a[1]),u.push(s[0]),u.push(s[1]),this.send(u,(function(t){r({machinestatus:t[7],resultcode:t[8]})}),(function(t){o(t),i.close()}))},t.prototype.readMachineID=function(n,e){var r=this,o=[];o.push(t.READMACHINEID[0]),o.push(0),o.push(t.READMACHINEID[1]),o.push(0),o.push(0),this.send(o,(function(t){var e={machinestatus:t[7],resultcode:t[8],machineid:r.getString(t.slice(9,17))};n(e)}),(function(t){e(t),r.close()}))},t.prototype.setMachineID=function(n,e,r){var o=this,i=this.convertString(n,8),a=[];a.push(t.SETMACHINEID[0]),a.push(0),a.push(t.SETMACHINEID[1]),a.push(8),a.push(0),a=a.concat(i),this.send(a,(function(t){e({machinestatus:t[7],resultcode:t[8]})}),(function(t){r(t),o.close()}))},t.prototype.readAPInfo=function(n,e){var r=this,o=[];o.push(t.READAPINFO[0]),o.push(0),o.push(t.READAPINFO[1]),o.push(0),o.push(0),this.send(o,(function(t){var e={machinestatus:t[7],resultcode:t[8],wifiname:r.getString(t.slice(9,25)),wifipassword:r.getString(t.slice(25,41)),ip:r.getIpAddress(t.slice(41,45)),subnet:r.getIpAddress(t.slice(45,49)),port:r.getNumber(t[49],t[50],t[51],t[52])};n(e)}),(function(t){e(t),r.close()}))},t.prototype.setAPInfo=function(n,e,r,o,i,a,s){var u=this,c=[];c.push(t.SETAPINFO[0]),c.push(0),c.push(t.SETAPINFO[1]),c.push(8),c.push(0),c=(c=(c=(c=(c=c.concat(this.convertString(n,16))).concat(this.convertString(e,16))).concat(this.convertIpAddress(r))).concat(this.convertIpAddress(o))).concat(this.convertNumber(i,8)),this.send(c,(function(t){a({machinestatus:t[7],resultcode:t[8]})}),(function(t){s(t),u.close()}))},t.prototype.readSTAInfo=function(n,e){var r=this,o=[];o.push(t.READSTAINFO[0]),o.push(0),o.push(t.READSTAINFO[1]),o.push(0),o.push(0),this.send(o,(function(t){for(var e=t[9],o=[],i=0;i<e;i++){var a=10+16*i,s=r.getString(t.slice(a,a+16));o.push(s)}n({machinestatus:t[7],resultcode:t[8],wificount:e,wifilist:o})}),(function(t){e(t),r.close()}))},t.prototype.setSTAInfo=function(n,e,r,o){var i=this,a=[];a.push(t.SETSTAINFO[0]),a.push(0),a.push(t.SETSTAINFO[1]),a.push(32),a.push(0),a=(a=a.concat(this.convertString(n,16))).concat(this.convertString(e,16));var s=this.getSendCode(a);this.send(a,(function(t){var n=i.getSendText(t);r({machinestatus:t[7],resultcode:t[8],hint:"SEND:"+s+"   ~~~~~~~RECEIVE"+n})}),(function(t){o(t),i.close()}))},t.prototype.resetMachine=function(n,e,r){var o=this,i=[];i.push(t.RESET[0]),i.push(0),i.push(t.RESET[1]),i.push(1),i.push(0),i.push(n),this.send(i,(function(t){e({machinestatus:t[7],resultcode:t[8]})}),(function(t){r(t),o.close()}))},t.prototype.tryCuy=function(n,e){var r=this,o=[];o.push(t.TRYCUT[0]),o.push(0),o.push(t.TRYCUT[1]),o.push(0),o.push(0),this.send(o,(function(t){n({machinestatus:t[7],resultcode:t[8]})}),(function(t){e(t),r.close()}))},t.prototype.readMachineStatus=function(n,e){var r=this,o=[];o.push(t.READMACHINESTATUS[0]),o.push(0),o.push(t.READMACHINESTATUS[1]),o.push(0),o.push(0),this.send(o,(function(t){n({machinestatus:t[7],resultcode:t[8],machineid:"001"})}),(function(t){e(t),r.close()}))},t.prototype.writeFile=function(n,e,r,o){var i=this;e=e.trim();var a=this.convertNumber(e.length,8),s=this.convertString(n,16),u=[];u.push(t.WRITEFILE[0]),u.push(1),u.push(t.WRITEFILE[1]),u.push(20),u.push(0),u=(u=u.concat(a)).concat(s);var c=this.convertString(e,e.length);this.send(u,(function(t){console.log(JSON.stringify(t)),i.sendfile(2,c,r)}),(function(t){o(t),i.close()}))},t.prototype.sendfile=function(n,e,r){var o=this;e.length<=1024&&(n=0);var i=e.slice(0,1024);e=e.slice(1024);var a=this.convertNumber(i.length,4),s=[];s.push(t.WRITEFILE[0]),s.push(n),s.push(t.WRITEFILE[1]),s.push(a[0]),s.push(a[1]),s=s.concat(i),this.sendnoend(s,(function(t){0!=n?(n++,o.sendfile(n,e,r)):r()}),(function(){}))},t.prototype.convertNumber=function(t,n){for(var e=t.toString(16);e.length<n;)e="0"+e.toString();for(var r=[],o=0;o<n;o+=2)r.push(parseInt("0x"+e[o]+e[o+1]));return r.reverse(),r},t.prototype.convertString=function(t,n){for(var e=[],r=0;r<n;r++)e.push(t.length>r?t[r].charCodeAt(0):0);return e},t.prototype.convertIpAddress=function(t){for(var n=[],e=0,r=t.split(".");e<r.length;e++)n.push(parseInt(r[e]));return n},t.prototype.getNumber2=function(t,n){return parseInt("0x"+n.toString(16)+t.toString(16))},t.prototype.getNumber=function(t,n,e,r){return parseInt("0x"+r.toString(16)+e.toString(16)+n.toString(16)+t.toString(16))},t.prototype.getIpAddress=function(t){for(var n=[],e=0,r=t;e<r.length;e++)n.push(r[e]);return n.join(".")},t.prototype.getString=function(t){for(var n="",e=0,r=t;e<r.length;e++){var o=r[e];0!=o&&(n+=String.fromCharCode(o))}return n},t.prototype.send=function(t,n,e){void 0===n&&(n=void 0),void 0===e&&(e=void 0);var r=[];r.push(90),r.push(165);for(var o=0,i=0,a=t;i<a.length;i++){var s=a[i];r.push(s),o+=s}r.push(o&=255),r.push(13),r.push(10),console.log("send",r),this.connector.Send([r],(function(t){console.log(t),null!=n&&n(t)}),(function(t){console.log(t),null!=e&&e(t),e(t)}))},t.prototype.getSendCode=function(t){var n=[];n.push(90),n.push(165);for(var e=0,r=0,o=t;r<o.length;r++){var i=o[r];n.push(i),e+=i}return n.push(e&=255),n.push(13),n.push(10),this.getSendText(n)},t.prototype.getSendText=function(t){for(var n="",e=0;e<t.length;e++){var r=t[e].toString(16);1==r.length&&(r="0"+r),n+=r}return n},t.prototype.sendnoend=function(t,n,e){void 0===n&&(n=void 0),void 0===e&&(e=void 0);var r=[];r.push(90),r.push(165);for(var o=0,i=t;o<i.length;o++)r.push(i[o]);console.log("send",r),this.connector.Send([r],(function(t){console.log(t),null!=n&&n(t)}),(function(t){console.log(t),null!=e&&e(t),e(t)}))},t.prototype.close=function(){this.connector.Close()},t.READSPEED=[170,16],t.READBLADEPRESS=[170,17],t.READGEARRATE=[170,18],t.READMACHINEID=[170,19],t.READAPINFO=[170,20],t.READSTAINFO=[170,21],t.SETSPEED=[187,16],t.SETBLADEPRESS=[187,17],t.SETGEARRATE=[187,18],t.SETMACHINEID=[187,19],t.SETAPINFO=[187,20],t.SETSTAINFO=[187,21],t.RESET=[187,22],t.TRYCUT=[187,23],t.READMACHINESTATUS=[170,32],t.WRITEFILE=[204,48],t}()},YNVt:function(t,n,e){"use strict";e.d(n,"a",(function(){return b})),e.d(n,"b",(function(){return D})),e.d(n,"c",(function(){return E})),e.d(n,"d",(function(){return A})),e.d(n,"e",(function(){return a}));var r=e("mrSG"),o=e("Twl7"),i=e("ocqh"),a=function(t){return new Promise((function(n,e){Object(o.m)((function(){s(t),u(t).then((function(e){e.animation&&e.animation.destroy(),c(t),n(e)}),(function(n){c(t),e(n)}))}))}))},s=function(t){var n=t.enteringEl,e=t.leavingEl;y(n,e,t.direction),t.showGoBack?n.classList.add("can-go-back"):n.classList.remove("can-go-back"),A(n,!1),e&&A(e,!1)},u=function(t){return Object(r.__awaiter)(void 0,void 0,void 0,(function(){var n;return Object(r.__generator)(this,(function(e){switch(e.label){case 0:return[4,d(t)];case 1:return[2,(n=e.sent())?l(n,t):h(t)]}}))}))},c=function(t){var n=t.leavingEl;t.enteringEl.classList.remove("ion-page-invisible"),void 0!==n&&n.classList.remove("ion-page-invisible")},d=function(t){return Object(r.__awaiter)(void 0,void 0,void 0,(function(){var n;return Object(r.__generator)(this,(function(r){switch(r.label){case 0:return t.leavingEl&&t.animated&&0!==t.duration?t.animationBuilder?[2,t.animationBuilder]:"ios"!==t.mode?[3,2]:[4,e.e(122).then(e.bind(null,"xxD1"))]:[2,void 0];case 1:return n=r.sent().iosTransitionAnimation,[3,4];case 2:return[4,e.e(123).then(e.bind(null,"v1ax"))];case 3:n=r.sent().mdTransitionAnimation,r.label=4;case 4:return[2,n]}}))}))},l=function(t,n){return Object(r.__awaiter)(void 0,void 0,void 0,(function(){var o,i;return Object(r.__generator)(this,(function(r){switch(r.label){case 0:return[4,p(n,!0)];case 1:r.sent(),r.label=2;case 2:return r.trys.push([2,5,,6]),[4,e.e(6).then(e.bind(null,"5QBn"))];case 3:return[4,r.sent().create(t,n.baseEl,n)];case 4:return o=r.sent(),[3,6];case 5:return r.sent(),o=t(n.baseEl,n),[3,6];case 6:return g(n.enteringEl,n.leavingEl),[4,v(o,n)];case 7:return i=r.sent(),n.progressCallback&&n.progressCallback(void 0),i&&m(n.enteringEl,n.leavingEl),[2,{hasCompleted:i,animation:o}]}}))}))},h=function(t){return Object(r.__awaiter)(void 0,void 0,void 0,(function(){var n,e;return Object(r.__generator)(this,(function(r){switch(r.label){case 0:return n=t.enteringEl,e=t.leavingEl,[4,p(t,!1)];case 1:return r.sent(),g(n,e),m(n,e),[2,{hasCompleted:!0}]}}))}))},p=function(t,n){return Object(r.__awaiter)(void 0,void 0,void 0,(function(){var e;return Object(r.__generator)(this,(function(r){switch(r.label){case 0:return e=(void 0!==t.deepWait?t.deepWait:n)?[b(t.enteringEl),b(t.leavingEl)]:[S(t.enteringEl),S(t.leavingEl)],[4,Promise.all(e)];case 1:return r.sent(),[4,f(t.viewIsReady,t.enteringEl)];case 2:return r.sent(),[2]}}))}))},f=function(t,n){return Object(r.__awaiter)(void 0,void 0,void 0,(function(){return Object(r.__generator)(this,(function(e){switch(e.label){case 0:return t?[4,t(n)]:[3,2];case 1:e.sent(),e.label=2;case 2:return[2]}}))}))},v=function(t,n){var e=n.progressCallback,r=new Promise((function(n){t.onFinish((function(e){"number"==typeof e?n(1===e):void 0!==t.hasCompleted&&n(t.hasCompleted)}))}));return e?(t.progressStart(!0),e(t)):t.play(),r},g=function(t,n){E(n,i.c),E(t,i.a)},m=function(t,n){E(t,i.b),E(n,i.d)},E=function(t,n){if(t){var e=new CustomEvent(n,{bubbles:!1,cancelable:!1});t.dispatchEvent(e)}},S=function(t){return t&&t.componentOnReady?t.componentOnReady():Promise.resolve()},b=function(t){return Object(r.__awaiter)(void 0,void 0,void 0,(function(){var n;return Object(r.__generator)(this,(function(e){switch(e.label){case 0:return(n=t)?null==n.componentOnReady?[3,2]:[4,n.componentOnReady()]:[3,4];case 1:if(null!=e.sent())return[2];e.label=2;case 2:return[4,Promise.all(Array.from(n.children).map(b))];case 3:e.sent(),e.label=4;case 4:return[2]}}))}))},A=function(t,n){n?(t.setAttribute("aria-hidden","true"),t.classList.add("ion-page-hidden")):(t.hidden=!1,t.removeAttribute("aria-hidden"),t.classList.remove("ion-page-hidden"))},y=function(t,n,e){void 0!==t&&(t.style.zIndex="back"===e?"99":"101"),void 0!==n&&(n.style.zIndex="100")},D=function(t){return t.classList.contains("ion-page")?t:t.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")||t}},uYVq:function(t,n,e){"use strict";e.d(n,"a",(function(){return r})),e.d(n,"b",(function(){return o}));var r=function(){return function(t,n){this.x=t,this.y=n}}(),o=function(t,n,e,r,o){var s=a(t.y,n.y,e.y,r.y,o);return i(t.x,n.x,e.x,r.x,s[0])},i=function(t,n,e,r,o){return o*(3*n*Math.pow(o-1,2)+o*(-3*e*o+3*e+r*o))-t*Math.pow(o-1,3)},a=function(t,n,e,r,o){return s((r-=o)-3*(e-=o)+3*(n-=o)-(t-=o),3*e-6*n+3*t,3*n-3*t,t).filter((function(t){return t>=0&&t<=1}))},s=function(t,n,e,r){if(0===t)return function(t,n,e){var r=n*n-4*t*e;return r<0?[]:[(-n+Math.sqrt(r))/(2*t),(-n-Math.sqrt(r))/(2*t)]}(n,e,r);var o=(3*(e/=t)-(n/=t)*n)/3,i=(2*n*n*n-9*n*e+27*(r/=t))/27;if(0===o)return[Math.pow(-i,1/3)];if(0===i)return[Math.sqrt(-o),-Math.sqrt(-o)];var a=Math.pow(i/2,2)+Math.pow(o/3,3);if(0===a)return[Math.pow(i/2,.5)-n/3];if(a>0)return[Math.pow(-i/2+Math.sqrt(a),1/3)-Math.pow(i/2+Math.sqrt(a),1/3)-n/3];var s=Math.sqrt(Math.pow(-o/3,3)),u=Math.acos(-i/(2*Math.sqrt(Math.pow(-o/3,3)))),c=2*Math.pow(s,1/3);return[c*Math.cos(u/3)-n/3,c*Math.cos((u+2*Math.PI)/3)-n/3,c*Math.cos((u+4*Math.PI)/3)-n/3]}},"v7+D":function(t,n,e){"use strict";e.d(n,"a",(function(){return o})),e.d(n,"b",(function(){return i}));var r=e("mrSG"),o=function(t,n,e,o,i){return Object(r.__awaiter)(void 0,void 0,void 0,(function(){var a;return Object(r.__generator)(this,(function(r){switch(r.label){case 0:if(t)return[2,t.attachViewToDom(n,e,i,o)];if("string"!=typeof e&&!(e instanceof HTMLElement))throw new Error("framework delegate is missing");return a="string"==typeof e?n.ownerDocument&&n.ownerDocument.createElement(e):e,o&&o.forEach((function(t){return a.classList.add(t)})),i&&Object.assign(a,i),n.appendChild(a),a.componentOnReady?[4,a.componentOnReady()]:[3,2];case 1:r.sent(),r.label=2;case 2:return[2,a]}}))}))},i=function(t,n){if(n){if(t)return t.removeViewFromDom(n.parentElement,n);n.remove()}return Promise.resolve()}},zwjO:function(t,n,e){"use strict";e.d(n,"a",(function(){return r}));var r=function(t){try{if("string"!=typeof t||""===t)return t;var n=document.createDocumentFragment(),e=document.createElement("div");n.appendChild(e),e.innerHTML=t,s.forEach((function(t){for(var e=n.querySelectorAll(t),r=e.length-1;r>=0;r--){var a=e[r];a.parentNode?a.parentNode.removeChild(a):n.removeChild(a);for(var s=i(a),u=0;u<s.length;u++)o(s[u])}}));for(var r=i(n),a=0;a<r.length;a++)o(r[a]);var u=document.createElement("div");u.appendChild(n);var c=u.querySelector("div");return null!==c?c.innerHTML:u.innerHTML}catch(d){return console.error(d),""}},o=function(t){if(!t.nodeType||1===t.nodeType){for(var n=t.attributes.length-1;n>=0;n--){var e=t.attributes.item(n),r=e.name;if(a.includes(r.toLowerCase())){var s=e.value;null!=s&&s.toLowerCase().includes("javascript:")&&t.removeAttribute(r)}else t.removeAttribute(r)}var u=i(t);for(n=0;n<u.length;n++)o(u[n])}},i=function(t){return null!=t.children?t.children:t.childNodes},a=["class","id","href","src","name","slot"],s=["script","style","iframe","meta","link","object","embed"]}}]);