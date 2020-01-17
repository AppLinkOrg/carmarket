import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { AddressApi } from 'src/providers/address.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss'],
  providers:[InstApi,AddressApi,OrderApi,EnterpriseApi]
})
export class EmployeeManagementComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public adressApi:AddressApi,
    public orderApi:OrderApi,
    public el:ElementRef,
    public enterpriseApi:EnterpriseApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }


  public item: any  = {
    region:'',
    address: '',
    name: '',
    phonenumber:'',
    morenaddress:'',
    operation: ''
  };

  obj:any = {
    orderno: '',
    start_time: '',
    end_time: ''
  }

  employee_id=''
  enterprise_id=''
  enterprise_id_name = ''

  length = null;

  pageSize = null;
  pages = null;
  newPage = null;
  pageList = [];
  selPage = 1;
  data = [];
  setData = null;
  
  order=null
  tempOrder=null

  employeePer = {
    name: '',
    position_name: '',
   
  }
  enterprise = {
    
  }

  employeeinfo = []
  addresslist=[]

 totalMoney = 0


  onMyShow(){
    let oldtime = (new Date()).getTime() +  6*60*60*1000;
    window.localStorage.setItem('oldtime',oldtime.toString())
    this.employeeinfo = []
    

      this.enterpriseApi.employeeinfo({ }).then((employeeinfo:any)=>{
        console.log(employeeinfo,'ooo')
        this.enterprise_id = employeeinfo.enterprise_id
        this.employee_id = employeeinfo.id
        if(employeeinfo.position == 'C'){
          employeeinfo.position_name = '报价员'
        }
        if(employeeinfo.position == 'D'){
          employeeinfo.position_name = '查询员'
        }
        if(employeeinfo.position == 'B'){
          employeeinfo.position_name = '老板'
        }
        this.employeeinfo.push(employeeinfo)

         
        this.adressApi.addresslist({ enterprise_id: this.enterprise_id,employee_id: this.employee_id }).then((addresslist:any)=>{
          this.pageList = []
          this.length = []
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
    
          this.pagination(this.addresslist,this.length)
        })
    
        
        
      })
    
  }

  reset(){
    this.obj = {
      userName: '',
      mobile: '',
      orderno: '',
      start_time: '',
      end_time: ''
    }
    this.totalMoney = 0
    let toggleBtns = document.getElementsByClassName('toggleBtns')[0].children
    
    toggleBtns[0].classList.add('btn-active')
    for(let k=1;k<toggleBtns.length;k++){
      toggleBtns[k].classList.remove('btn-active')
    }

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
        this.pagination(this.order,this.length);
        this.getreturnorder();
      }
     

      console.log(this.order)
    })

    
  }

  changeMoren(flag){
    if(flag){
      return '是'
    }else {
      return '否'
    }
  }
  isshow=false
  @ViewChild('myModal',{static:true}) closeModal: ElementRef;
  saveAddress(address){
    // this.el.nativeElement.querySelector('#myModal').modal('toggle')

    
    console.log(address,'addresssssss')

    this.pageList = []
    address.morenaddress = this.changeMoren(address.morenaddress)
    address.enterprise_id = this.enterprise_id
    address.employee_id = this.employee_id
    address.status = 'A'
    console.log('llllll')
    console.log(address,'address')
    console.log('aaaaa')


    if(address.morenaddress=='是'){
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
                      this.onMyShow()
                      this.closeModal.nativeElement.click();
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
                        this.closeModal.nativeElement.click();
                        this.onMyShow()
      
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
                  this.onMyShow()
                  this.closeModal.nativeElement.click();
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
                    this.closeModal.nativeElement.click();
                    this.onMyShow()
  
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

  inputphone(){
    this.isshow = false
  }

  
  newadd(){
    this.item = []
    this.item.operation = 'A'
  }


  editAddress(item){

    console.log(item,'addresssssss')
    if(item.morenaddress=="否"){
      item.morenaddress = false
    }else if(item.morenaddress=='是'){
      item.morenaddress = true
    }

    this.item = item
    this.item.operation = 'E'


  }

  quxiao(){
    this.pageList = []
    if(this.item.morenaddress==false){
      this.item.morenaddress = "否"
    }else if(this.item.morenaddress==true){
      this.item.morenaddress = '是'
    }
    this.onMyShow()
    console.log(this.item,'quxiao')
  }
 

  deleteAddress(item){
    this.pageList = []
    this.adressApi.addressdelete({ id: item.id }).then((deleteAdress:any)=>{
  
      if(deleteAdress.code == '0'){
        this.onMyShow()
      }
    })
  }

  myAccount(event){

    this.pageList = []
    this.length = []

    event.target.classList.add('btn-active')
    var others = event.target.parentElement.children
    
    for(let i=1;i<others.length;i++){
      others[i].classList.remove('btn-active')
    }

    let toggleBox1 = document.getElementsByClassName('toggleBox1')[0];
    let toggleBox2 = document.getElementsByClassName('toggleBox2')[0];
    let toggleBox3 = document.getElementsByClassName('toggleBox3')[0];
    toggleBox1.classList.remove('box-hide')
    toggleBox2.classList.add('box-hide')
    toggleBox3.classList.add('box-hide')

    this.onMyShow()

  }

  address(event){
    this.pageList = []
    this.length = []
    

    event.target.classList.add('btn-active')
    var others = event.target.parentElement.children
    for(let i=2;i<others.length;i++){
      others[i].classList.remove('btn-active')
    }
    others[0].classList.remove('btn-active')

    let toggleBox1 = document.getElementsByClassName('toggleBox1')[0];
    let toggleBox2 = document.getElementsByClassName('toggleBox2')[0];
    let toggleBox3 = document.getElementsByClassName('toggleBox3')[0];
    toggleBox1.classList.add('box-hide')
    toggleBox2.classList.remove('box-hide')
    toggleBox3.classList.add('box-hide')

    this.onMyShow()
    
  }

  myachievement(event){
    this.pageList = []
    this.length = []
    this.totalMoney = 0

    event.target.classList.add('btn-active')
    var others = event.target.parentElement.children
    for(let i=0;i<others.length-1;i++){
      others[i].classList.remove('btn-active')
    }

    let toggleBox1 = document.getElementsByClassName('toggleBox1')[0];
    let toggleBox2 = document.getElementsByClassName('toggleBox2')[0];
    let toggleBox3 = document.getElementsByClassName('toggleBox3')[0];
    toggleBox3.classList.remove('box-hide')
    toggleBox2.classList.add('box-hide')
    toggleBox1.classList.add('box-hide')

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
  returnlist
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
  myAll(event){
    console.log(this.order)
    this.pageList = []
    this.bb=false;
    event.target.classList.add('btn-active')
    var others = event.target.parentElement.children
    for(let i=1;i<others.length;i++){
      others[i].classList.remove('btn-active')
    }

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

  myfinish(event){
    console.log(this.order)
    this.pageList = []
    this.bb=false;
    event.target.classList.add('btn-active')
    var others = event.target.parentElement.children
    for(let i=2;i<others.length;i++){
      others[i].classList.remove('btn-active')
    }
    others[0].classList.remove('btn-active')

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

  myreturn(event){
    this.pageList = []
    this.bb=true;
    console.log(this.order)

    event.target.classList.add('btn-active')
    var others = event.target.parentElement.children
    for(let i=0;i<others.length-2;i++){
      others[i].classList.remove('btn-active')
    }
    others[others.length-1].classList.remove('btn-active')

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
  myyitui(event){
    console.log(this.order)
    this.pageList = []
    this.bb=true;
    event.target.classList.add('btn-active')
    var others = event.target.parentElement.children
    for(let i=0;i<others.length-1;i++){
      others[i].classList.remove('btn-active')
    }


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
    this.selectPage(this.selPage = 1);
  }

  lastPage(){
    this.selectPage(this.selPage = this.pages);
  }


}
