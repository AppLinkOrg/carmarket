import { Component, OnInit, ɵConsole } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [InstApi, EnterpriseApi, OrderApi]
})
export class HomeComponent extends AppBase {

  toggle = false;
  instinfo = null;
  public operatorinfo: any = {
    name: '',
    enterprise: {
      name: ''
    }
  }

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public enterpriseApi: EnterpriseApi,
    public OrderApi: OrderApi,
  ) {
    super(router, activeRoute, instApi, OrderApi, enterpriseApi);

    this.instinfo = {};
    this.instApi.info({ unicode: "carmarkets" }).then((instinfo) => {

      this.instinfo = instinfo;
    });
  }

  enterprise_id = ''
  employee_id = ''
  obj = null
  returnnum = '';
  ordernum = ''
  quotereadnum = ""
  risread = 'Y'
  oread = 'Y'
  isread = 'Y'
  onMyShow() {

    let oldtime = (new Date()).getTime() + 6*60*60*1000;
    window.localStorage.setItem('oldtime', oldtime.toString())

    this.activeRoute.queryParams.subscribe((aa) => {

      this.update(aa);
      this.getquot();
      setInterval(() => {

        this.update(aa);
        this.getquot();

      }, 20 * 1000);



    })


  }


  toggleSidebar() {
    console.log('jjjjjj')
    this.toggle = !this.toggle;

  }

  update(aa) {




    var that = this;

    this.enterpriseApi.employeeinfo({}).then((employeeinfo: any) => {
      console.log(employeeinfo)

      if (employeeinfo.enterprise_id == "0") {
        this.router.navigate(["login"]);
        return
      }
      this.employee_id = employeeinfo.id;
      this.enterprise_id = employeeinfo.enterprise_id
      console.log("进来了");
      console.log(333333)
      console.log(employeeinfo)
      console.log(employeeinfo.enterprise_id, employeeinfo.id)
      console.log(44444444)

      var a = this.orderapi
      var arrs = [];

      //   a.quotelist({}).then((list: any) => {
      //     console.log(list,'list')
      //     a.ignore({quoteemployee_id:this.employee_id,quoteenterprise_id:this.enterprise_id}).then((ignore:any)=>{
      //       if(ignore.length==0){
      //         // arrs = list;
      //         a.quotationlist({quotecompan_id:this.enterprise_id}).then((quotationlist:any)=>{
      //           console.log(quotationlist,'quotationlist')
      //           if(quotationlist.length==0){
      //             for (var i =0;i<list.length;i++) {

      //               if(list[i].quotestatus=='Q'){

      //                 list[i].quote_id = list[i].id
      //                 list[i].quoteper = employeeinfo.id
      //                 list[i].quotecompan_id = employeeinfo.enterprise_id
      //                 list[i].pinzhi = list[i].pinzhi;
      //                     if(list[i].invoice_demand!=""){
      //                       list[i].invoice_demand =list[i].invoice_demand
      //                     }else if(list[i].invoice_demand=="" &&list[i].invoice_demand_value!=""){
      //                       list[i].invoice_demand =list[i].invoice_demand_value
      //                     }
      //                     delete list[i].id
      //                     // var json = {
      //                     //   quote_id:  list[i].quote_id,
      //                     //   quoteper: this.employee_id,
      //                     //   quotecompan_id:this.enterprise_id,
      //                     //   pinzhi: list[i].pinzhi,
      //                     //   invoice_demand:  list[i].invoice_demand ,
      //                     //   enterprise_id: list[i].enterprise_id,
      //                     //   employee_id:list[i].employee_id,
      //                     //   quote_time:list[i].quote_time,
      //                     //   amount:list[i].amount,
      //                     //   order_id:list[i].order_id,
      //                     //   quotenumber:list[i].quotenumber,
      //                     //   vincode:list[i].vincode,
      //                     //   carmodel:list[i].carmodel,
      //                     //   fittings:list[i].fittings,
      //                     //   quotestatus:list[i].quotestatus,
      //                     //   namesplate:list[i].namesplate,
      //                     //   frontofcar:list[i].frontofcar,
      //                     //   rearofcar:list[i].rearofcar,
      //                     //   photo1:list[i].photo1,
      //                     //   photo2:list[i].photo2,
      //                     //   partnumber:list[i].partnumber,
      //                     //   information:list[i].information,
      //                     //   corporate_name:list[i].corporate_name,
      //                     //   corporate_add:list[i].corporate_add,

      //                     // }
      //                     that.addquote(i, list[i])


      //                 }
      //             }
      //           }else {
      //               for (var i=0;i<list.length;i++) {
      //                 // list[i]
      //                 if( list[i].quotestatus=='Q' ||  list[i].quotestatus=="W"){
      //                       if(this.notinignore4( list[i],quotationlist)){
      //                         list[i].quote_id =  list[i].id
      //                         list[i].quoteper = employeeinfo.id
      //                         list[i].quotecompan_id = employeeinfo.enterprise_id
      //                         list[i].quotestatus = "Q";
      //                         list[i].pinzhi =  list[i].pinzhi;
      //                         if( list[i].invoice_demand!=""){
      //                           list[i].invoice_demand = list[i].invoice_demand
      //                         }else if( list[i].invoice_demand=="" && list[i].invoice_demand_value!=""){
      //                           list[i].invoice_demand = list[i].invoice_demand_value
      //                         }
      //                         delete list[i].id
      //                         // var json = {
      //                         //   quote_id:  list[i].quote_id,
      //                         //   quoteper: this.employee_id,
      //                         //   quotecompan_id:this.enterprise_id,
      //                         //   pinzhi:  list[i].pinzhi,
      //                         //   invoice_demand:   list[i].invoice_demand ,
      //                         //   enterprise_id:  list[i].enterprise_id,
      //                         //   employee_id: list[i].employee_id,
      //                         //   quote_time: list[i].quote_time,
      //                         //   amount: list[i].amount,
      //                         //   order_id: list[i].order_id,
      //                         //   quotenumber: list[i].quotenumber,
      //                         //   vincode: list[i].vincode,
      //                         //   carmodel: list[i].carmodel,
      //                         //   fittings: list[i].fittings,
      //                         //   quotestatus: list[i].quotestatus,
      //                         //   namesplate: list[i].namesplate,
      //                         //   frontofcar: list[i].frontofcar,
      //                         //   rearofcar: list[i].rearofcar,
      //                         //   photo1: list[i].photo1,
      //                         //   photo2: list[i].photo2,
      //                         //   partnumber: list[i].partnumber,
      //                         //   information: list[i].information,
      //                         //   corporate_name: list[i].corporate_name,
      //                         //   corporate_add: list[i].corporate_add,


      //                         // }
      //                         that.addquote(i,list[i])
      //                       }

      //                   }
      //               }

      //           }

      //         })
      //       }else  {
      //         for(let item of list){
      //           if(this.notinignore(item,ignore)){
      //             arrs.push(item)
      //           }
      //         }
      //         if(arrs.length!=0){
      //           console.log(arrs,'arrs')
      //           a.quotationlist({quotecompan_id:this.enterprise_id}).then((quotationlist:any)=>{
      //             console.log(quotationlist,'quotationlist')
      //             if(quotationlist.length==0){
      //               for (var i=0;i<arrs.length;i++) {

      //                 if(arrs[i].quotestatus=='Q'){

      //                   arrs[i].quote_id = arrs[i].id
      //                       arrs[i].quoteper = this.employee_id
      //                       arrs[i].quotecompan_id = this.enterprise_id
      //                       arrs[i].pinzhi = arrs[i].pinzhi;

      //                       if(arrs[i].invoice_demand!=""){
      //                         arrs[i].invoice_demand =arrs[i].invoice_demand
      //                       }else if(arrs[i].invoice_demand=="" &&arrs[i].invoice_demand_value!=""){
      //                         arrs[i].invoice_demand =arrs[i].invoice_demand_value
      //                       }
      //                       delete arrs[i].id
      //                       // var json = {
      //                       //   quote_id: arrs[i].quote_id,
      //                       //   quoteper: this.employee_id,
      //                       //   quotecompan_id:this.enterprise_id,
      //                       //   pinzhi: arrs[i].pinzhi,
      //                       //   invoice_demand:  arrs[i].invoice_demand ,
      //                       //   enterprise_id: arrs[i].enterprise_id,
      //                       //   employee_id:arrs[i].employee_id,
      //                       //   quote_time:arrs[i].quote_time,
      //                       //   amount:arrs[i].amount,
      //                       //   order_id:arrs[i].order_id,
      //                       //   quotenumber:arrs[i].quotenumber,
      //                       //   vincode:arrs[i].vincode,
      //                       //   carmodel:arrs[i].carmodel,
      //                       //   fittings:arrs[i].fittings,
      //                       //   quotestatus:arrs[i].quotestatus,
      //                       //   namesplate:arrs[i].namesplate,
      //                       //   frontofcar:arrs[i].frontofcar,
      //                       //   rearofcar:arrs[i].rearofcar,
      //                       //   photo1:arrs[i].photo1,
      //                       //   photo2:arrs[i].photo2,
      //                       //   partnumber:arrs[i].partnumber,
      //                       //   information:arrs[i].information,
      //                       //   corporate_name:arrs[i].corporate_name,
      //                       //   corporate_add:arrs[i].corporate_add,


      //                       // }
      //                       that.addquote(i,arrs[i])

      //                   }
      //               }
      //             }else {
      //               for (var i=0;i<arrs.length;i++) {

      //                   if(arrs[i].quotestatus=='Q' || arrs[i].quotestatus=="W"){
      //                         if(this.notinignore4(arrs[i],quotationlist)){
      //                           arrs[i].quote_id = arrs[i].id
      //                           arrs[i].quoteper = this.employee_id
      //                           arrs[i].quotecompan_id = this.enterprise_id
      //                           arrs[i].quotestatus = "Q";
      //                           arrs[i].pinzhi = arrs[i].pinzhi;
      //                           if(arrs[i].invoice_demand!=""){
      //                             arrs[i].invoice_demand =arrs[i].invoice_demand
      //                           }else if(arrs[i].invoice_demand=="" &&arrs[i].invoice_demand_value!=""){
      //                             arrs[i].invoice_demand =arrs[i].invoice_demand_value
      //                           }
      //                           delete arrs[i].id;
      //                           // var json = {
      //                           //   quote_id: arrs[i].quote_id,
      //                           //   quoteper: this.employee_id,
      //                           //   quotecompan_id:this.enterprise_id,
      //                           //   pinzhi: arrs[i].pinzhi,
      //                           //   invoice_demand:  arrs[i].invoice_demand ,
      //                           //   enterprise_id: arrs[i].enterprise_id,
      //                           //   employee_id:arrs[i].employee_id,
      //                           //   quote_time:arrs[i].quote_time,
      //                           //   amount:arrs[i].amount,
      //                           //   order_id:arrs[i].order_id,
      //                           //   quotenumber:arrs[i].quotenumber,
      //                           //   vincode:arrs[i].vincode,
      //                           //   carmodel:arrs[i].carmodel,
      //                           //   fittings:arrs[i].fittings,
      //                           //   quotestatus:arrs[i].quotestatus,
      //                           //   namesplate:arrs[i].namesplate,
      //                           //   frontofcar:arrs[i].frontofcar,
      //                           //   rearofcar:arrs[i].rearofcar,
      //                           //   photo1:arrs[i].photo1,
      //                           //   photo2:arrs[i].photo2,
      //                           //   partnumber:arrs[i].partnumber,
      //                           //   information:arrs[i].information,
      //                           //   corporate_name:arrs[i].corporate_name,
      //                           //   corporate_add:arrs[i].corporate_add,
      //                           // }
      //                           that.addquote(i,arrs[i])
      //                         }

      //                     }
      //                 }

      //             }

      //           })
      //         }

      //       }


      //     })



      // })



      this.orderapi.orderisread({ enterprise_id: this.enterprise_id, employee_id: this.employee_id }).then((ret: any) => {
        // console.log(ret, '订单')
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








    })

    if (aa.result == 'yes') {
      this.enterpriseApi.employeeinfo({}).then((employeeinfo: any) => {
        console.log(employeeinfo)


        if (employeeinfo.enterprise_id == "0") {
          this.router.navigate(["login"]);
          return
        }

        this.enterprise_id = employeeinfo.enterprise_id
        this.employee_id = employeeinfo.id

        this.obj = employeeinfo

        console.log(1111111)
        console.log(employeeinfo)
        console.log(employeeinfo.enterprise_id, employeeinfo.id)
        console.log(22225222)


        var a = this.orderapi
        var a = this.orderapi
        var arrs = [];
        // this.getquot();
        //   a.quotelist({}).then((list: any) => {
        //     console.log(list,'list')
        //     a.ignore({quoteemployee_id:this.employee_id,quoteenterprise_id:this.enterprise_id}).then((ignore:any)=>{
        //       if(ignore.length==0){
        //         // arrs = list;
        //         a.quotationlist({quotecompan_id:this.enterprise_id}).then((quotationlist:any)=>{
        //           console.log(quotationlist,'quotationlist')
        //           if(quotationlist.length==0){
        //             for (var i =0;i<list.length;i++) {

        //               if(list[i].quotestatus=='Q'){

        //                 list[i].quote_id = list[i].id
        //                 list[i].quoteper = employeeinfo.id
        //                 list[i].quotecompan_id = employeeinfo.enterprise_id
        //                 list[i].pinzhi = list[i].pinzhi;
        //                     if(list[i].invoice_demand!=""){
        //                       list[i].invoice_demand =list[i].invoice_demand
        //                     }else if(list[i].invoice_demand=="" &&list[i].invoice_demand_value!=""){
        //                       list[i].invoice_demand =list[i].invoice_demand_value
        //                     }
        //                     delete list[i].id
        //                     // var json = {
        //                     //   quote_id:  list[i].quote_id,
        //                     //   quoteper: this.employee_id,
        //                     //   quotecompan_id:this.enterprise_id,
        //                     //   pinzhi: list[i].pinzhi,
        //                     //   invoice_demand:  list[i].invoice_demand ,
        //                     //   enterprise_id: list[i].enterprise_id,
        //                     //   employee_id:list[i].employee_id,
        //                     //   quote_time:list[i].quote_time,
        //                     //   amount:list[i].amount,
        //                     //   order_id:list[i].order_id,
        //                     //   quotenumber:list[i].quotenumber,
        //                     //   vincode:list[i].vincode,
        //                     //   carmodel:list[i].carmodel,
        //                     //   fittings:list[i].fittings,
        //                     //   quotestatus:list[i].quotestatus,
        //                     //   namesplate:list[i].namesplate,
        //                     //   frontofcar:list[i].frontofcar,
        //                     //   rearofcar:list[i].rearofcar,
        //                     //   photo1:list[i].photo1,
        //                     //   photo2:list[i].photo2,
        //                     //   partnumber:list[i].partnumber,
        //                     //   information:list[i].information,
        //                     //   corporate_name:list[i].corporate_name,
        //                     //   corporate_add:list[i].corporate_add,

        //                     // }
        //                     that.addquote(i, list[i])


        //                 }
        //             }
        //           }else {
        //               for (var i=0;i<list.length;i++) {
        //                 // list[i]
        //                 if( list[i].quotestatus=='Q' ){
        //                       if(this.notinignore4( list[i],quotationlist)){
        //                         list[i].quote_id =  list[i].id
        //                         list[i].quoteper = employeeinfo.id
        //                         list[i].quotecompan_id = employeeinfo.enterprise_id
        //                         list[i].quotestatus = "Q";
        //                         list[i].pinzhi =  list[i].pinzhi;
        //                         if( list[i].invoice_demand!=""){
        //                           list[i].invoice_demand = list[i].invoice_demand
        //                         }else if( list[i].invoice_demand=="" && list[i].invoice_demand_value!=""){
        //                           list[i].invoice_demand = list[i].invoice_demand_value
        //                         }
        //                         delete list[i].id
        //                         // var json = {
        //                         //   quote_id:  list[i].quote_id,
        //                         //   quoteper: this.employee_id,
        //                         //   quotecompan_id:this.enterprise_id,
        //                         //   pinzhi:  list[i].pinzhi,
        //                         //   invoice_demand:   list[i].invoice_demand ,
        //                         //   enterprise_id:  list[i].enterprise_id,
        //                         //   employee_id: list[i].employee_id,
        //                         //   quote_time: list[i].quote_time,
        //                         //   amount: list[i].amount,
        //                         //   order_id: list[i].order_id,
        //                         //   quotenumber: list[i].quotenumber,
        //                         //   vincode: list[i].vincode,
        //                         //   carmodel: list[i].carmodel,
        //                         //   fittings: list[i].fittings,
        //                         //   quotestatus: list[i].quotestatus,
        //                         //   namesplate: list[i].namesplate,
        //                         //   frontofcar: list[i].frontofcar,
        //                         //   rearofcar: list[i].rearofcar,
        //                         //   photo1: list[i].photo1,
        //                         //   photo2: list[i].photo2,
        //                         //   partnumber: list[i].partnumber,
        //                         //   information: list[i].information,
        //                         //   corporate_name: list[i].corporate_name,
        //                         //   corporate_add: list[i].corporate_add,


        //                         // }
        //                         that.addquote(i,list[i])
        //                       }

        //                   }
        //               }

        //           }

        //         })
        //       }else  {
        //         for(let item of list){
        //           if(that.notinignore(item,ignore)){
        //             arrs.push(item)
        //           }
        //         }
        //         if(arrs.length!=0){
        //           console.log(arrs,'arrs')
        //           a.quotationlist({quotecompan_id:this.enterprise_id}).then((quotationlist:any)=>{
        //             console.log(quotationlist,'quotationlist')
        //             if(quotationlist.length==0){
        //               for (var i=0;i<arrs.length;i++) {

        //                 if(arrs[i].quotestatus=='Q'){

        //                   arrs[i].quote_id = arrs[i].id
        //                       arrs[i].quoteper = this.employee_id
        //                       arrs[i].quotecompan_id = this.enterprise_id
        //                       arrs[i].pinzhi = arrs[i].pinzhi;

        //                       if(arrs[i].invoice_demand!=""){
        //                         arrs[i].invoice_demand =arrs[i].invoice_demand
        //                       }else if(arrs[i].invoice_demand=="" &&arrs[i].invoice_demand_value!=""){
        //                         arrs[i].invoice_demand =arrs[i].invoice_demand_value
        //                       }
        //                       delete arrs[i].id
        //                       // var json = {
        //                       //   quote_id: arrs[i].quote_id,
        //                       //   quoteper: this.employee_id,
        //                       //   quotecompan_id:this.enterprise_id,
        //                       //   pinzhi: arrs[i].pinzhi,
        //                       //   invoice_demand:  arrs[i].invoice_demand ,
        //                       //   enterprise_id: arrs[i].enterprise_id,
        //                       //   employee_id:arrs[i].employee_id,
        //                       //   quote_time:arrs[i].quote_time,
        //                       //   amount:arrs[i].amount,
        //                       //   order_id:arrs[i].order_id,
        //                       //   quotenumber:arrs[i].quotenumber,
        //                       //   vincode:arrs[i].vincode,
        //                       //   carmodel:arrs[i].carmodel,
        //                       //   fittings:arrs[i].fittings,
        //                       //   quotestatus:arrs[i].quotestatus,
        //                       //   namesplate:arrs[i].namesplate,
        //                       //   frontofcar:arrs[i].frontofcar,
        //                       //   rearofcar:arrs[i].rearofcar,
        //                       //   photo1:arrs[i].photo1,
        //                       //   photo2:arrs[i].photo2,
        //                       //   partnumber:arrs[i].partnumber,
        //                       //   information:arrs[i].information,
        //                       //   corporate_name:arrs[i].corporate_name,
        //                       //   corporate_add:arrs[i].corporate_add,


        //                       // }
        //                       that.addquote(i,arrs[i])

        //                   }
        //               }
        //             }else {
        //               for (var i=0;i<arrs.length;i++) {

        //                   if(arrs[i].quotestatus=='Q' ){
        //                         if(this.notinignore4(arrs[i],quotationlist)){
        //                           arrs[i].quote_id = arrs[i].id
        //                           arrs[i].quoteper = this.employee_id
        //                           arrs[i].quotecompan_id = this.enterprise_id
        //                           arrs[i].quotestatus = "Q";
        //                           arrs[i].pinzhi = arrs[i].pinzhi;
        //                           if(arrs[i].invoice_demand!=""){
        //                             arrs[i].invoice_demand =arrs[i].invoice_demand
        //                           }else if(arrs[i].invoice_demand=="" &&arrs[i].invoice_demand_value!=""){
        //                             arrs[i].invoice_demand =arrs[i].invoice_demand_value
        //                           }
        //                           delete arrs[i].id;
        //                           // var json = {
        //                           //   quote_id: arrs[i].quote_id,
        //                           //   quoteper: this.employee_id,
        //                           //   quotecompan_id:this.enterprise_id,
        //                           //   pinzhi: arrs[i].pinzhi,
        //                           //   invoice_demand:  arrs[i].invoice_demand ,
        //                           //   enterprise_id: arrs[i].enterprise_id,
        //                           //   employee_id:arrs[i].employee_id,
        //                           //   quote_time:arrs[i].quote_time,
        //                           //   amount:arrs[i].amount,
        //                           //   order_id:arrs[i].order_id,
        //                           //   quotenumber:arrs[i].quotenumber,
        //                           //   vincode:arrs[i].vincode,
        //                           //   carmodel:arrs[i].carmodel,
        //                           //   fittings:arrs[i].fittings,
        //                           //   quotestatus:arrs[i].quotestatus,
        //                           //   namesplate:arrs[i].namesplate,
        //                           //   frontofcar:arrs[i].frontofcar,
        //                           //   rearofcar:arrs[i].rearofcar,
        //                           //   photo1:arrs[i].photo1,
        //                           //   photo2:arrs[i].photo2,
        //                           //   partnumber:arrs[i].partnumber,
        //                           //   information:arrs[i].information,
        //                           //   corporate_name:arrs[i].corporate_name,
        //                           //   corporate_add:arrs[i].corporate_add,
        //                           // }
        //                           that.addquote(i,arrs[i])
        //                         }

        //                     }
        //                 }

        //             }

        //           })
        //         }

        //       }


        //     })



        // })

        console.log("进来了");

        this.orderapi.orderisread({ enterprise_id: this.enterprise_id, employee_id: this.employee_id }).then((ret: any) => {
          // console.log(ret, '订单')
          if (ret) {
            if (ret.quote > '0') {
              this.isread = 'N';
              this.quotereadnum = ret.quote;
            } else {
              this.isread = 'Y';
            }

            if (ret.order > '0') {
              this.oread = 'N';
              this.ordernum = ret.order;
            } else {
              this.oread = 'Y';
            }

            if (ret.return > '0') {
              this.risread = 'N';
              this.returnnum = ret.return;
            } else {
              this.risread = 'Y';
            }

          }
        })






      })
    }
  }
  list = [];
  getquot() {
    this.list = [];
    var a = this.orderapi;
    a.quotelist({}).then((list: any) => {
      this.list = list;
      console.log(list)
      if (this.list.length == list.length) {
        this.getigro();
        console.log("aaaaaaa");

      }
    })
  }
  ignore = [];
  getigro() {
    this.ignore = [];
    var a = this.orderapi;
    a.ignore({ quoteemployee_id: this.employee_id, quoteenterprise_id: this.enterprise_id }).then((ignore: any) => {
      this.ignore = ignore;
      console.log(ignore)
      if (this.ignore.length == ignore.length) {
        console.log("bbbbbbbb")
        this.getquotion();
      }

    })
  }
  quotion = [];
  getquotion() {
    this.quotion = [];
    var a = this.orderapi;
    a.quotationlist({ quotecompan_id: this.enterprise_id }).then((quotationlist: any) => {
      this.quotion = quotationlist;
      console.log("cccccccc");
      console.log(quotationlist)
      if (this.quotion.length == quotationlist.length) {
        this.saoxuan();
      }

    })
  }

  saoxuan() {
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].quotestatus == 'Q' || this.list[i].quotestatus == 'W') {

        if (this.notinignore(this.list[i], this.ignore)) {
        
          if (this.notinignore4(this.list[i], this.quotion)) {
           
            this.list[i].quote_id = this.list[i].id;
            this.list[i].quoteper = this.employee_id;
            this.list[i].quotecompan_id = this.enterprise_id;
            this.list[i].quotestatus = "Q";
            this.list[i].pinzhi = this.list[i].pinzhi;
            this.list[i].photo1 = this.list[i].photo1;
            if (this.list[i].invoice_demand != "") {
              this.list[i].invoice_demand = this.list[i].invoice_demand;
            } else if (this.list[i].invoice_demand == "" && this.list[i].invoice_demand_value != "") {
              this.list[i].invoice_demand = this.list[i].invoice_demand_value;
            }
            delete this.list[i].id;


            this.addquote(i, this.list[i]);



          }

        }


      }

    }

  }

  addquote(i, json) {
    var a = this.orderapi;
    setTimeout(() => {
      a.addquotation(json).then((addquotation: any) => {
        console.log(addquotation, 'addquotation');
      })
    }, i * 600);

  }

  notinignore4(item, arr) {
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

  notinignore(item, ignore) {
    for (let igitem of ignore) {
      if (item.id == igitem.quote_id) {
        return false;
      }
    }
    return true;
  }

}
