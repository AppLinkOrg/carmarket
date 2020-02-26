import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides, IonInfiniteScroll, IonMenu } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { TabsPage } from '../tabs/tabs.page';
import {EnterpriseApi} from 'src/providers/enterprise.api';
import { AddressApi } from 'src/providers/address.api';
// import { ConsumeApi } from 'src/providers/consume.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  providers:[EnterpriseApi,AddressApi,OrderApi]
})
export class Tab5Page extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    public enterpriseApi: EnterpriseApi,
    public adressApi: AddressApi,
    public orderApi: OrderApi,
    
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute,enterpriseApi,orderApi);
    this.headerscroptshow = 480;
    this.currentpage = "tab5";
    

  }
  addresslist=null;
  public item: any  = {
    region:'',
    address: '',
    name: '',
    phonenumber:'',
    morenaddress:'',
    operation: ''
  };
  isshow = false

  enterprise_id=''
  employee_id = ''

  employeeinfo = [];
  allenterprise = []
  enterpriseinfo = [];
  list = []

  length = null;

  pageSize = null;
  pages = null;
  newPage = null;
  pageList = [];
  selPage = 1;
  data = [];
  setData = null;
  acc_money=0;
  onMyLoad(){
    this.params;
    console.log('tab55555555');
   
  }
  onMyShow(){
    console.log('tab5tab5')
    AppBase.TABName = "tab5";
    AppBase.LASTTAB = this;
    this.getperinfo();
   
  }
  position='';
  getperinfo(){
    this.employeeinfo = [];
    this.allenterprise = []
    this.enterpriseinfo = [];
    var a = this.adressApi

    this.enterpriseApi.employeeinfo({ }).then((employeeinfo:any)=>{


      console.log(employeeinfo,'理论')

      this.enterprise_id = employeeinfo.enterprise_id
      this.employee_id = employeeinfo.id
      
      
      if(employeeinfo.position == 'C'){
        employeeinfo.position_name = '报价员'
      }
      if(employeeinfo.position == 'D'){
        employeeinfo.position_name = '查询员'
      }
      if(employeeinfo.position == 'B'){
        employeeinfo.position_name = '老板';
        this.position='B';
      }

      this.employeeinfo.push(employeeinfo)

      this.enterpriseApi.allenterprise({enterprise_id:this.enterprise_id }).then((allenterprise:any)=>{
        

        // this.allenterprise = allenterprise.filter((item)=>{
        //   if(item.power_value=='Y'){
        //     item.powerss = true;
        //   }else if(item.power_value=='N'){
        //     item.powerss = false;
        //   }
        //   return item.position != 'B'

        // })
        for(let i=0;i<allenterprise.length;i++){
          console.log(allenterprise[i],'allalll');
          console.log(allenterprise[i].power,'allalll');
          if(allenterprise[i].position!='B'){
            allenterprise[i].powerss=false;
            if(allenterprise[i].power=='是'){
              allenterprise[i].powerss = true;
            }
            this.allenterprise.push(allenterprise[i]);
          }
        }
        console.log(this.allenterprise)
      })

      this.enterpriseApi.enterpriseinfo({id: this.enterprise_id}).then((enterpriseinfo:any)=>{
        console.log(enterpriseinfo)
       
        this.enterpriseinfo.push(enterpriseinfo)
        this.acc_money = enterpriseinfo.account_money
        console.log(this.acc_money,'mmmmmmm')
      })

     
      a.addresslist({ enterprise_id: this.enterprise_id }).then((addresslist:any)=>{
    
        this.addresslist = addresslist
        this.length = this.addresslist.length

  
        for(let i=0;i<this.addresslist.length;i++){
          this.addresslist[i].index = i
          if(this.addresslist[i].morenaddress_value=='是'){
            this.addresslist[i].morenaddress = '是'
          }else if( this.addresslist[i].morenaddress_value ='否' ) {
            this.addresslist[i].morenaddress = "否"
          }
        }
        console.log(this.addresslist,'addlist')
  
        // this.pagination(this.addresslist,this.length)
      })
  

    })
  }
  btnscolor=1
qiehuan(e){
  this.btnscolor = e;
}

changeSwitch(e,list){
  console.log(list,'llll')

  if(list.power == '是'){
    e.target.classList.add('onqiuti')
    e.target.parentElement.classList.add('onBtn')

    e.target.classList.remove('offqiuti')
    e.target.parentElement.classList.remove('offBtn')

    this.enterpriseApi.updatepower({id: list.id, power: 'N'}).then((updatepower:any)=>{
      console.log(updatepower,'ddd')
      if(updatepower.code == '0'){

        console.log(this.allenterprise)
       
        for(let i=0;i<this.allenterprise.length;i++){
          if(this.allenterprise[i].id == list.id){
            this.allenterprise[i].power = '否'
            return
          }
        }
       console.log(this.allenterprise)
        
      }
      
    })

  }else if(list.power == '否'){
    e.target.classList.add('offqiuti')
    e.target.parentElement.classList.add('offBtn')
    
    e.target.classList.remove('onqiuti')
    e.target.parentElement.classList.remove('onBtn')

    this.enterpriseApi.updatepower({id: list.id, power: 'Y'}).then((updatepower:any)=>{
      console.log(updatepower,'aaa')

      if(updatepower.code == '0'){
        
        for(let i=0;i<this.allenterprise.length;i++){
          if(this.allenterprise[i].id == list.id){
            this.allenterprise[i].power = '是'
            return 
          }
        }
       console.log(this.allenterprise)

      }

    })

  }

  

}
tixian=false
  applytixian(){

   this.tixian=true

  }

xiaoxi(operatorinfo){
  this.navigate('/consume',{enterprise_id:operatorinfo.enterprise_id,name:operatorinfo.name});
}
yeji(operatorinfo){
  this.navigate('/achievement',{enterprise_id:operatorinfo.enterprise_id})
}

money=""
  error=""
  cancel(){
    this.tixian=false
    this.error=""
  }
  clear(){
    this.error=""
  }
  queding(){
    console.log(this.money,'money')
    if(this.money!=null && this.money!=""){
      if(this.acc_money >= Number(this.money)){
        this.enterpriseApi.addtixian({enterprise_id:this.enterprise_id,money:this.money,status:'A'}).then((addtixian)=>{
          console.log(addtixian,'addtixian')
          if(addtixian){
            this.orderApi.updatemoney({id:this.enterprise_id,money:this.money}).then((updatemoney)=>{
              console.log(updatemoney)
              
            })
            this.tixian=false
            this.error=""
            this.getperinfo();
          }
        })
      }else {
        this.error='提现金额太大了，余额不足！'
      }
     
    }else {
      this.error='提现金额为空，请重新填入！'
    }
    
  }
  xinzen=false;
  newadd(){
    this.xinzen=true;
    this.item = []
    this.item.operation = 'A'
  }

  changeMoren(flag){
    if(flag){
      return '是'
    }else {
      return '否'
    }
  }

  
  quxiao(){
    this.xinzen=false;
    this.isshow = false
    this.pageList = []
    if(this.item.morenaddress==false){
      this.item.morenaddress = "否"
    }else if(this.item.morenaddress==true){
      this.item.morenaddress = '是'
    }
    this.getperinfo()
    console.log(this.item,'quxiao')
  }
 
  saveAddress(address){
    this.pageList = []
    address.morenaddress = this.changeMoren(address.morenaddress)
    address.enterprise_id = this.enterprise_id
    address.employee_id = this.employee_id
  
    address.status = 'A'
    console.log(address,'address')

    if(address.morenaddress=="是"){
      this.adressApi.clearaddress({check:'Y',employee_id:this.employee_id}).then((clearaddress:any)=>{
        console.log(clearaddress)
        if(clearaddress.code=='0'){
          if(this.item.operation == 'E'){

            if(address.region!="" && address.address!="" && address.name!=""){
              console.log('kljkljlkjkl')
              if(address.phonenumber!=""){
                let reg = /^1[3|4|5|7|8]\d{9}$/
                if(reg.test(address.phonenumber)){
                  console.log('ppppppp')
                  this.adressApi.updateaddress(address).then((updateaddress:any)=>{
                    console.log(updateaddress,'updateaddress')
                    if(updateaddress.code == '0'){
                      this.getperinfo()
                      this.xinzen=false;
                    }
                  })
                }else {
                  this.isshow = true
                }
              }
            }
            
           
          }else {
            if(address.region!="" && address.address!="" && address.name!=""){
              console.log('kljkljlkjkl')
              if(address.phonenumber!=""){
                let reg = /^1[3|4|5|7|8]\d{9}$/
                if(reg.test(address.phonenumber)){
                  console.log('ppppppp')
                  this.adressApi.addaddress(address).then((addaddress:any)=>{
      
                      if(addaddress.code == '0'){
                        this.xinzen=false;
                        this.getperinfo();
                        
                      }
                  })
                }else {
                  this.isshow = true
                }
              }
            }
      
          }
      
        }
      })
    }else {

    

      if(this.item.operation == 'E'){

        if(address.region!="" && address.address!="" && address.name!=""){
          console.log('kljkljlkjkl')
          if(address.phonenumber!=""){
            let reg = /^1[3|4|5|7|8]\d{9}$/
            if(reg.test(address.phonenumber)){
              console.log('ppppppp')
              this.adressApi.updateaddress(address).then((updateaddress:any)=>{
                console.log(updateaddress,'updateaddress')
                if(updateaddress.code == '0'){
                  this.getperinfo()
                  this.xinzen=false;
                }
              })
            }else {
              this.isshow = true
            }
          }
        }
        
      
      }else {
        if(address.region!="" && address.address!="" && address.name!=""){
          console.log('kljkljlkjkl')
          if(address.phonenumber!=""){
            let reg = /^1[3|4|5|7|8]\d{9}$/
            if(reg.test(address.phonenumber)){
              console.log('ppppppp')
              this.adressApi.addaddress(address).then((addaddress:any)=>{

                  if(addaddress.code == '0'){
                   this.xinzen=false;
                    this.getperinfo();
                    
                  }
              })
            }else {
              this.isshow = true
            }
          }
        }

      }
    }
   
  }



  editAddress(item){
    this.xinzen=true;
    console.log(item,'item')
    if(item.morenaddress=="否"){
      item.morenaddress = false
    }else if(item.morenaddress=='是'){
      item.morenaddress = true
    }
    this.item = item
    this.item.operation = 'E'


  }
 
  
  deleteAddress(item){
    this.pageList = []
    this.adressApi.addressdelete({ id: item.id }).then((deleteAdress:any)=>{
  
      if(deleteAdress.code == '0'){
        this.getperinfo()
      }
    })
  }
  obj:any = {
    orderno: '',
    start_time: '',
    end_time: ''
  }

  btnscolor2=1;
  yuangong(e){
    this.btnscolor2=e;
    if(e==3){
      this.myachievement();
    }
  }
  
  order=null;
  reset(){
    this.obj = {
      userName: '',
      mobile: '',
      orderno: '',
      start_time: '',
      end_time: ''
    }
    this.totalMoney = 0
    

    this.orderApi.mylist({ enterprise_id:this.enterprise_id, employee_id:  this.employee_id }).then((order)=>{
      this.pageList = []
      this.length = []
      this.tempOrder = order

      let tOrder = []

      console.log(this.tempOrder)

      for(let i=0;i<this.tempOrder.length;i++){

        if(this.tempOrder[i].order_status == 'N' ){
          this.totalMoney += parseFloat( this.tempOrder[i].totalamount)
          tOrder.push(this.tempOrder[i])
        }

        if(this.tempOrder[i].order_status == 'R'){
          this.totalMoney += parseFloat( this.tempOrder[i].totalamount)
          tOrder.push(this.tempOrder[i])
        }

        if(this.tempOrder[i].order_status == 'Y'){
          this.totalMoney += parseFloat( this.tempOrder[i].totalamount)
          tOrder.push(this.tempOrder[i])
        }
      }

      this.order = tOrder

      if(this.order!=null){
        for(let k=0;k<this.order.length;k++){
          this.order[k].index = k
        }

        this.length = this.order.length
        // this.pagination(this.order,this.length);
        this.getreturnorder();
      }
     

      console.log(this.order)
    })

    
  }
  totalMoney = 0;
  tempOrder=[];
  myachievement(){
    this.pageList = []
    this.length = []
    this.totalMoney = 0

    this.orderApi.mylist({ enterprise_id:this.enterprise_id, employee_id:  this.employee_id }).then((order)=>{
      this.pageList = []
      this.length = []
      this.tempOrder = order

      let tOrder = []

      console.log(this.tempOrder)

      for(let i=0;i<this.tempOrder.length;i++){

        if(this.tempOrder[i].order_status == 'N' ){
          this.totalMoney += parseFloat( this.tempOrder[i].totalamount)
          tOrder.push(this.tempOrder[i])
        }

        if(this.tempOrder[i].order_status == 'R'){
          this.tempOrder[i].order_status_name = '已完成';
          this.totalMoney += parseFloat( this.tempOrder[i].totalamount)
          tOrder.push(this.tempOrder[i])
        }

        if(this.tempOrder[i].order_status == 'Y'){
          this.tempOrder[i].order_status_name = '已完成'
          this.totalMoney += parseFloat( this.tempOrder[i].totalamount)
          tOrder.push(this.tempOrder[i])
        }
      }

      this.order = tOrder

      if(this.order!=null){
        for(let k=0;k<this.order.length;k++){
          this.order[k].index = k
        }

        
        this.getreturnorder();
      }
     

      console.log(this.order)
    })


  }
  returnlist=[];
  getreturnorder(){
    
      this.orderApi.returnlist({gongsi:this.enterprise_id,baojia:this.employee_id}).then((returnlist:any)=>{
          console.log(returnlist)
          this.returnlist = returnlist.filter((item)=>{
            this.totalMoney -= parseFloat(item.return_money);
            if(item.orderstatus=='Y' || item.orderstatus=='R'){
              item.order_status_name = item.orderstatus_name;
              item.orderno=item.order_orderno;
              item.receiver=item.order_receiver;
              item.finish_time=item.return_time;
              item.totalamount=item.return_money;
              this.order.push(item)
            }
            return item
          })
          for(let k=0;k<this.order.length;k++){
            this.order[k].index = k
          }
  
          this.length = this.order.length
        this.pagination(this.order,this.length);
          console.log(this.totalMoney,'lll')
      })  
    
  }
  leixins=1;
  leixin(e){
    this.leixins=e;
    if(e==1){
      this.myAll();
    }else if(e==2){
      this.myfinish();
    }else if(e==3){
      this.myreturn();
    }else if(e==4){
      this.myyitui();
    }
  }
  myAll(){
    console.log(this.order)
    this.pageList = []
    this.bb=false;
    

    if(this.order != null){

      let finOrder = this.order.filter((item)=>{
        if(item.order_status == 'N' || item.order_status == 'Y' || item.order_status == 'R'){
          item.order_status_name='已完成';
          return item
        }
         
      })

      this.returnlist.filter((item)=>{
        if(item.orderstatus == 'Y' || item.orderstatus == 'R'){
          item.order_status_name=item.orderstatus_name;
          finOrder.push(item);
        }
        
      })

      for(let k=0;k<finOrder.length;k++){
        finOrder[k].index = k;
      }

      this.order =finOrder
      this.length = this.order.length
      this.pagination(this.order,this.length)
      console.log(this.order)

    }
   
  }

  myfinish(){
    console.log(this.order)
    this.pageList = []
    this.bb=false;

    if(this.order != null){
      let finOrder = this.order.filter((item)=>{
        return item.order_status == 'N' || item.order_status == 'Y' || item.order_status == 'R'
      })

      for(let k=0;k<finOrder.length;k++){
        finOrder[k].index = k;
        finOrder[k].order_status_name='已完成';
      }
  
      this.length = finOrder.length
      this.pagination(finOrder,this.length)
  
      console.log(finOrder)
  
    }

  
  }

  myreturn(){
    this.pageList = []
    this.bb=true;
    console.log(this.order)

    

    if(this.order != null){
      let reOrder = this.returnlist.filter((item)=>{
        return item.orderstatus == 'R'
      })

      for(let k=0;k<reOrder.length;k++){
        reOrder[k].index = k;
        reOrder[k].orderno=reOrder[k].order_orderno;
        reOrder[k].receiver=reOrder[k].order_receiver;
        reOrder[k].finish_time=reOrder[k].return_time;
        reOrder[k].totalamount=reOrder[k].return_money;
        reOrder[k].order_status_name='待退款';
      }
      
      this.length = reOrder.length
      this.pagination(reOrder,this.length)
      console.log(reOrder)
  
    }
 
   
  }
bb=false;
  myyitui(){
    console.log(this.order)
    this.pageList = []
    this.bb=true;
    


    if(this.order != null){
      let yiOrder = this.returnlist.filter((item)=>{
        return item.orderstatus == 'Y'
      })

      
      for(let k=0;k<yiOrder.length;k++){
        yiOrder[k].index = k;
        yiOrder[k].orderno=yiOrder[k].order_orderno;
        yiOrder[k].receiver=yiOrder[k].order_receiver;
        yiOrder[k].finish_time=yiOrder[k].return_time;
        yiOrder[k].totalamount=yiOrder[k].return_money;
        yiOrder[k].order_status_name='已退货';
      }
      

      this.length = yiOrder.length
      this.pagination(yiOrder,this.length)
      console.log(yiOrder)
    }

    

  }



  search(item){

    console.log(item)
    console.log(this.order)
    this.order = [];
    this.returnlist=[];
    this.totalMoney = 0

    this.orderApi.mylist({enterprise_id: this.enterprise_id,employee_id:this.employee_id }).then((order:any)=>{
      console.log(order)
    this.orderApi.returnlist({gongsi:this.enterprise_id,baojia:this.employee_id}).then((returnlist:any)=>{

    
        
        this.tempOrder = order
        let tOrder = []
        this.pageList = []
        this.length = []
        
      
        for(let i=0;i<this.tempOrder.length;i++){

            if(this.tempOrder[i].orderno == item.orderno){
             
              let index = this.tempOrder[i].order_time.indexOf(' ')

              if(index != -1){
                this.tempOrder[i].order_time = this.tempOrder[i].order_time.slice(0,index)
              }else {
                this.tempOrder[i].order_time = this.tempOrder[i].order_time
              }

              console.log(this.tempOrder[i].order_time,index)
              if(item.start_time <= this.tempOrder[i].order_time ){
                if(this.tempOrder[i].order_time <= item.end_time){
                  tOrder.push(this.tempOrder[i])
                }else if(item.end_time == ''){
                  tOrder.push(this.tempOrder[i])
                }
              }else if(item.start_time == ''){
               
                if(this.tempOrder[i].order_time <= item.end_time){
                  tOrder.push(this.tempOrder[i])
                }else if(item.end_time == ''){
                  tOrder.push(this.tempOrder[i])
                }
    
              }
    
            }
            else if(item.orderno == '') {

              let index = this.tempOrder[i].order_time.indexOf(' ')
              if(index != -1){
                this.tempOrder[i].order_time = this.tempOrder[i].order_time.slice(0,index)
              }else {
                this.tempOrder[i].order_time = this.tempOrder[i].order_time
              }
              console.log(this.tempOrder[i].order_time,index)
              if(item.start_time <= this.tempOrder[i].order_time ){

                if(this.tempOrder[i].order_time <= item.end_time){
                  tOrder.push(this.tempOrder[i])
                }else if(item.end_time == ''){
                  tOrder.push(this.tempOrder[i])
                }
                
               
              }else if(item.start_time == ''){
                
                if(this.tempOrder[i].order_time <= item.end_time){
                  tOrder.push(this.tempOrder[i])
                }else if(item.end_time == ''){
                  tOrder.push(this.tempOrder[i])
                }
    
              }

            }
          }

        console.log(this.tempOrder)
        console.log(tOrder)

        for(let reitem of returnlist){
          if(this.checklist(reitem,tOrder)){
              
              reitem.order_status_name = reitem.orderstatus_name;
              reitem.orderno=reitem.order_orderno;
              reitem.receiver=reitem.order_receiver;
              reitem.finish_time=reitem.return_time;
              reitem.totalamount=reitem.return_money;
              this.returnlist.push(reitem);
          }
        }
      
        for(let k=0;k<tOrder.length;k++){
          tOrder[k].index = k;
          this.totalMoney += parseFloat(tOrder[k].totalamount);
          this.checkorderno(tOrder[k],this.returnlist)
        }

        tOrder = tOrder.concat(this.returnlist);
          for(let k=0;k<tOrder.length;k++){
            tOrder[k].index = k;
          }

        this.order = tOrder

        this.length = tOrder.length
        this.pagination(tOrder,this.length)
        console.log(this.order)
      })
      })

   
  }
 
  checkorderno(item,arr){
    for(let iitem of arr){
      if(item.orderno == iitem.order_orderno){
        this.totalMoney -= parseFloat(iitem.return_money);
      }
    }
  }
  checklist(item,arr){
    for(let iitem of arr){
      if(item.order_id==iitem.id){
        return true;
      }
    }
  }

pagination(list,length){
  this.pageSize = 10;
  // if()
  this.pages = Math.ceil( length/this.pageSize )
  this.newPage = this.pages > 10 ? 10 : this.pages;
  this.selPage = 1;
  
  this.setData = function(){
    this.data = list.slice(this.pageSize*(this.selPage-1),this.pageSize*this.selPage);
  }
  this.data = list.slice(0, this.pageSize);

  for (var i = 0; i < this.newPage; i++) {
     this.pageList.push(i + 1);
   }

}

selectPage(page) {
    if (page < 1 || page > this.pages) return;
   
    if (page > 2) {
        var newpageList = [];
        for (var i = (page - 3) ; i < ((page + 2) > this.pages ? this.pages : (page + 2)) ; i++) {
            newpageList.push(i + 1);
        }
        this.pageList = newpageList;
    }
    this.selPage = page;
    this.setData();
    this.isActivePage(page);
}

isActivePage(page){
  return this.selPage == page;
}


Previous() {
  this.selectPage(this.selPage - 1);
}

Next () {
  this.selectPage(this.selPage + 1);
}

fristPage(){
  this.selectPage(this.selPage = 1)
}

lastPage(){
  this.selectPage(this.selPage = this.pages)
}

}