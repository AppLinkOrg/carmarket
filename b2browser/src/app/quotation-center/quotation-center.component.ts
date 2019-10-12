import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';

@Component({
  selector: 'app-quotation-center',
  templateUrl: './quotation-center.component.html',
  styleUrls: ['./quotation-center.component.scss'],
  providers:[InstApi,OrderApi,EnterpriseApi]
})
export class QuotationCenterComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi,
    public enterpriseApi:EnterpriseApi,
  ) { 
    super(router,activeRoute,instApi);
  }

    list=[];
    list2=[];
    ignore=null;

    length = null;

    pageSize = null;
    pages = null;
    newPage = null;
    pageList = [];
    selPage = 1;
    data = null;
    setData = null;

    isquote = true;
    isshow = true

    distinctlist = null;

    enterprise_id = ''
    enterprise_id_name=''
    employee_id = ''
    employee_id_name = ''
  onMyShow(){


    var a=this.orderApi;

    this.enterpriseApi.employeeinfo({ }).then((employeeinfo:any)=>{
      console.log(employeeinfo)
      this.enterprise_id = employeeinfo.enterprise_id
      this.employee_id = employeeinfo.id
      this.employee_id_name = employeeinfo.name
      this.enterprise_id_name = employeeinfo.enterprise.name



      a.ignore({enterprise_id: this.enterprise_id, employee_id: this.employee_id }).then((ignore:any)=>{
        // this.ignore = ignore
      
        console.log(ignore,'sssss')
        console.log(ignore.length,'aaaaa')
        
          if(ignore.length == 0){

            a.quotelist({ }).then((list:any)=>{
              console.log(list,'qqqq')
              for(let item of list){
                if(item.quotestatus == 'Q'){
                  item.photoLen=0
                  if(item.frontofcar!=''){
                    item.photoLen ++
                  }
                  if(item.namesplate!=''){
                    item.photoLen ++
                  }
                  if(item.rearofcar!=''){
                    item.photoLen ++
                  }
                  if(item.photo1!=''){
                    item.photoLen ++
                  }
                  if(item.photo2!=''){
                    item.photoLen ++
                  }
                  this.list.push(item)
                }

               

              
              }

              for(let i=0;i<this.list.length;i++){
                this.list[i].index = i
              }

              this.length = this.list.length;
              this.pagination(this.list,this.length);
              console.log(this.list)
          });

          }else {

            a.quotelist({ }).then((list:any)=>{
              console.log(list,'bbb')
              var result=[];
              for(let item of list){
                if(item.quotestatus === 'Q'){
                  if(this.notinignore(item,ignore)){
                    result.push(item);
                  }
                }
                
              }

              this.list=result;

              for(let i=0;i<this.list.length;i++){
                this.list[i].index = i
              }

              this.length = this.list.length;
              this.pagination(this.list,this.length);

          });
          }
          
      })


      a.distinctlist({}).then((distinctlist:any)=>{
        console.log(distinctlist,"33333")
        this.distinctlist = distinctlist
      })
      

    })


    

      
     
  }

  distinct = []

  choose(e){

    // this.distinct = []

    console.log(e)

    var current = e.target
    // current.classList.add('disname-active')
    console.log(current.innerText)

    console.log(this.hasClass(current,'disname-active'))
    if(current.innerText == "全部") {
      this.distinct = []

        var others = current.parentElement.childNodes
        console.log(others,'444')
        for(let i=0;i<others.length; i++){
          if(current != others[i] && this.hasClass(others[i],'disname-active')){
            others[i].classList.remove('disname-active')
          }
          current.classList.add('disname-active')
        }

        if(this.hasClass(current,'disname-active')){

          this.distinct.push(current.innerText)
        }


    }else {

      for(let i=0;i<this.distinct.length;i++){
        if(this.distinct[i] == "全部"){
            this.distinct.splice(i,1)
        }
      }


      var others = current.parentElement.childNodes
        for(let i=0;i<others.length; i++){
          if(others[i].innerText == "全部"){
            others[i].classList.remove('disname-active')
          }
        }

        if(this.hasClass(current,'disname-active')){
          current.classList.remove('disname-active')
        }else {
          current.classList.add('disname-active')
        }

        if(this.hasClass(current,'disname-active')){

          this.distinct.push(current.innerText)
        }
  
    }

  }

   hasClass(obj,cls){
    var cls = cls || '';
    if( cls.replace(/\s/g,'').length == 0){
        return false;//当cls没有参数时,返回false;
    }else{
        return new RegExp(' ' + cls + '').test(' ' + obj.className);
    }
  }

  reset(e){
    this.distinct = []
    console.log(e)
    var others = e.target.parentElement.parentElement.parentElement.parentElement.childNodes[1].childNodes
    console.log(others)
    if(this.hasClass(others[0],'disname-active')){

    }else {
      others[0].classList.add('disname-active')
    }

    for(let i=1;i<others.length;i++){
      if(this.hasClass(others[i],'disname-active')){
        others[i].classList.remove('disname-active')
      }
    }
    this.distinct = ['全部']
  }

  save(){
    this.pageList = []

    console.log(this.distinct)
    console.log(this.list)
    let temp = []
    for(let i=0;i<this.list.length;i++){
      for(let j=0;j<this.distinct.length;j++){

        if(this.distinct[j] == "全部"){

          temp.push(this.list[i])

        }else {

          if(this.list[i].enterprise_corporate_address==this.distinct[j]){
            // console.log(this.distinct[j])
             temp.push(this.list[i])
  
          }else {
            console.log(false)
          }
  
        }
        
      }
    }

    this.length = temp.length

    this.pagination(temp,this.length)
    console.log(temp)

  }


  photoshow = false 
  imgs = []
  showPhoto(item){
    this.imgs = []
    this.photoshow = true 
    console.log(item)

    this.imgs.push(item)

    this.imgs = this.imgs.filter((item,index)=>{
      if(item.frontofcar=="" && item.namesplate !=""){
        item.frontofcar = item.namesplate
        item.namesplate = ""
      }
      if(item.frontofcar=="" && item.namesplate =="" && item.rearofcar!=""){
        item.frontofcar = item.rearofcar
        item.rearofcar = ""
      }
      if(item.frontofcar=="" && item.namesplate =="" && item.rearofcar=="" && item.photo1 !=""){
        item.frontofcar = item.photo1
        item.photo1 = ""
      }
      if(item.frontofcar=="" && item.namesplate =="" && item.rearofcar=="" && item.photo1 =="" && item.photo2 !=""){
        item.frontofcar = item.photo2
        item.photo2 = ""
      }
      return item
    })

    console.log(this.imgs)

  }

  


  ignoreHandle(item){
    this.list = [];
    this.pageList = [];
    item.quote_id = item.id
    item.ignorestatus = 'Y'
    item.employee_id = this.employee_id
  
    
      this.orderApi.searchignore(item).then((searchignore:any)=>{
   
        if(searchignore.code == "0"){

          this.onMyShow()

          
        }
      })
    
  }

  screening(){
    
  }



  // 待报价
  quoteHandle(e){
    this.list = [];
    this.pageList = [];
    this.isquote = true;
    this.isshow = false
    
    
    let current = e.target
    current.classList.add('btn-active')
    let others = e.target.parentElement.childNodes

    for(let i=0;i<others.length;i++){
      if(others[i] != current ){
        others[i].classList.remove('btn-active')
      }
    }
   
    this.onMyShow()



  }

  notinignore(item,ignore){
    for(let igitem of ignore){
      if(item.id==igitem.quote_id){
        return false;
      }
    }
    return true;
  }
  

  // 已忽略
  neglected(e){
    this.list = [];
    this.pageList = [];
    this.isshow = false
    this.isquote = false;

    let current = e.target
    current.classList.add('btn-active')
    let others = e.target.parentElement.childNodes

    for(let i=0;i<others.length;i++){
      if(others[i] != current ){
        others[i].classList.remove('btn-active')
      }
    }

    this.orderApi.ignore({enterprise_id: this.enterprise_id,employee_id: this.employee_id}).then((ignore:any)=>{
      this.list = ignore;
      this.length = ignore.length;
      

      for(let i=0;i<this.list.length;i++){
        this.list[i].index = i
      }

      this.pagination(this.list,this.length);
    
    })
    
  }

  
// 已过期
  expired(e){

    this.list = []

    let current = e.target
    current.classList.add('btn-active')
    let others = e.target.parentElement.childNodes

    for(let i=0;i<others.length;i++){
      if(others[i] != current ){
        others[i].classList.remove('btn-active')
      }
    }

    this.orderApi.quotelist({ }).then((list:any)=>{

      for(let i=0;i<list.length;i++){
        if(list[i].quotestatus === "W"){
          this.list.push(list[i])
        }
      }

      for(let i=0;i<this.list.length;i++){
        let lasttime = ''
        this.list[i].index = i
       
        if(this.list[i].submitquote_time !=""){

          let date = new Date()
          let years = date.getFullYear()
          let months = date.getMonth()+1
          let days = date.getDay()
          let dates = new Date(years, months, 0).getDate()

          console.log(this.list[i].submitquote_time)
          let year = this.list[i].submitquote_time.slice(0,4)
          let month = this.list[i].submitquote_time.slice(4,7)
          let day = this.list[i].submitquote_time.slice(7,10) 

          if((dates-day)<7){
            day = dates - parseInt(day)
            if(month == 12){
              year++
              month= 1
            }else {
              month ++
            }
          }else {
            day = parseInt(day) - 7
          }

          if(this.list[i].submitquote_time_dateformat<lasttime){

            this.orderApi.addexpired(this.list[i]).then((addexpired:any)=>{
              console.log(addexpired)
            })

          }

         
          lasttime = year + month + day
          console.log(lasttime,'1111')
        }

      }

      console.log(this.list,'888')
      this.length = this.list.length
      this.pagination(this.list,this.length);
    });


  }

  // 已报价
  quotedPrice(e){
    this.list = [];
    this.pageList = [];
    this.isquote = false;
    this.isshow = false

    let current = e.target
    current.classList.add('btn-active')
    let others = e.target.parentElement.childNodes

    for(let i=0;i<others.length;i++){
      if(others[i] != current ){
        others[i].classList.remove('btn-active')
      }
    }

    
    this.orderApi.quotelist({ }).then((list:any)=>{

      for(let i=0;i<list.length;i++){
        if(list[i].quotestatus === "W"){
          this.list.push(list[i])
        }
      }

      for(let i=0;i<this.list.length;i++){
        this.list[i].index = i
      }

      this.length = this.list.length
      this.pagination(this.list,this.length);
    });

  }

  // 全部
  allQuote(e){
    console.log(event)
    this.list = [];
    this.pageList = [];
    this.isquote = false;
    this.isshow = true

   let current = e.target
    current.classList.add('btn-active')
    let others = e.target.parentElement.childNodes

    for(let i=0;i<others.length;i++){
      if(others[i] != current ){
        others[i].classList.remove('btn-active')
      }
    }


  

    this.orderApi.quotelist({}).then((list:any)=>{
      this.list = list

      for(let i=0;i<this.list.length;i++){
        this.list[i].index = i
      }

      this.length = this.list.length;
      this.pagination(this.list,this.length);

    
      console.log(this.list,this.length)
    });

  
    
  }



  tiaozhuan(itemId){
    this.router.navigate(['quotationDetails'],{
      queryParams: {
        id: itemId,
        employee_id: this.employee_id,
        employee_id_name: this.employee_id_name,
        enterprise_id_name: this.enterprise_id_name
      }
    })
  }

  tiaozhuan2(itemId){
    this.router.navigate(['detailsOfQuotedPrice'],{
      queryParams: {
        id: itemId,
       
      }
    })
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





