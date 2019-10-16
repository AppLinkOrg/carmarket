import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { AddressApi } from 'src/providers/address.api';
import { emptyScheduled } from 'rxjs/internal/observable/empty';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { ConsumeApi } from 'src/providers/consume.api';


@Component({
  selector: 'app-management-center',
  templateUrl: './management-center.component.html',
  styleUrls: ['./management-center.component.scss'],
  providers:[InstApi,AddressApi,EnterpriseApi,ConsumeApi]
})
export class ManagementCenterComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public adressApi:AddressApi,
    public enterpriseApi:EnterpriseApi,
    public consumeApi:ConsumeApi
  ) { 
    super(router,activeRoute,instApi);
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

  onMyShow(){
    
    var a = this.adressApi

    this.enterpriseApi.employeeinfo({ }).then((employeeinfo:any)=>{


      console.log(employeeinfo)

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

      this.enterpriseApi.allenterprise({enterprise_id:this.enterprise_id }).then((allenterprise:any)=>{
        

        this.allenterprise = allenterprise.filter((item)=>{
          return item.position != 'B'
        })
        console.log(this.allenterprise)
      })

      this.enterpriseApi.enterpriseinfo({id: this.enterprise_id}).then((enterpriseinfo:any)=>{
        console.log(enterpriseinfo)
       
        this.enterpriseinfo.push(enterpriseinfo)
        
      })

     
      a.addresslist({ enterprise_id: this.enterprise_id }).then((addresslist:any)=>{
    
        this.addresslist = addresslist
        this.length = this.addresslist.length
  
        for(let i=0;i<this.addresslist.length;i++){
          this.addresslist[i].index = i
        }
  
        this.pagination(this.addresslist,this.length)
      })
  

    })

    
    
   
  }


  watchAchi(per){
    console.log(per)
    this.router.navigate(["achievement"],{
      queryParams:per
    })
  }


changeSwitch(e,list){
    

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
  
  changeMoren(flag){
    if(flag){
      return 'Y'
    }else {
      return 'N'
    }
  }

  saveAddress(address){
    this.pageList = []
    address.morenaddress = this.changeMoren(address.morenaddress)
  
    address.status = 'A'

    if(this.item.operation == 'E'){
      
      this.adressApi.updateaddress(address).then((updateaddress:any)=>{
     
        if(updateaddress.code == '0'){
          this.onMyShow()
        }
      })
    }else {
      this.adressApi.addaddress(address).then((addaddress:any)=>{

          if(addaddress.code == '0'){
            this.onMyShow()
          }
      })

    }

   
  }

  newadd(){
    this.item = []
    this.item.operation = 'A'
  }


  editAddress(item){

    this.item = item
    this.item.operation = 'E'


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

    this.employeeinfo = [];
    this.allenterprise = []
    this.enterpriseinfo = [];
    this.list = []

    event.target.classList.add('btn-active')
    var others = event.target.parentElement.children
    
    for(let i=1;i<others.length;i++){
      others[i].classList.remove('btn-active')
    }

    let toggleBox1 = document.getElementsByClassName('toggleBox1')[0];
    let toggleBox2 = document.getElementsByClassName('toggleBox2')[0];
    toggleBox1.classList.remove('box-hide')
    toggleBox2.classList.add('box-hide')

    this.onMyShow()

  }

  address(event){
    this.pageList = []
    

    event.target.classList.add('btn-active')
    var others = event.target.parentElement.children
    for(let i=2;i<others.length;i++){
      others[i].classList.remove('btn-active')
    }
    others[0].classList.remove('btn-active')

    let toggleBox1 = document.getElementsByClassName('toggleBox1')[0];
    let toggleBox2 = document.getElementsByClassName('toggleBox2')[0];
    toggleBox1.classList.add('box-hide')
    toggleBox2.classList.remove('box-hide')

  }

  applytixian(){

   

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