import { Component, OnInit, ViewChildren, OnDestroy } from '@angular/core';
import { ICategory } from 'src/app/interface/category';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { IProductList, IProductListData } from 'src/app/interface/product';
import { ICountryData, IStateData, ICityData } from 'src/app/interface/user';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import * as _ from 'lodash';

declare const noUiSlider: any
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
// https://stackblitz.com/edit/angular-pagination-bkfqss?file=app%2Fpagination%2Fpagination.component.html
export class ProductListComponent implements OnInit, OnDestroy {
  @ViewChildren('selectedRadio') selectedRadio:any;
  isRequestFilter = false;
  isRequestReset = false;
  isRequestLoadMore = false;
  isFilterCollapse  = {
    isCategory: true,
    isCountry: true,
    isType: true,
    isPrice: true,
    isCity:true,
    isState:true
  }
  countryArray: Array<ICountryData> = [];
  stateArray: Array<IStateData> = [];
  cityArray: Array<ICityData> = [];
  typeArray: Array<{ name: string, availabe: boolean }> = [
    { name: 'Cash', availabe: true },
      { name: 'Lease', availabe: true },
  ];
  categoryArray: Array<ICategory> = [];
  filterPayload:IProductList = {
    title:'',
    pageNumber:1,
    categoryId:0,
    subCategoryId:0,
    countryId:0,
    stateId:0,
    cityId:0,
    maxPrice:0,
    min:'',
    max:'',
    minPrice:0,
  }
  adsListArray:Array<IProductListData> = [];

  constructor(
    private productService:ProductService,
    private commonService:CommonService,
    private userService: UserService
    ) { }

  ngOnInit() {
    // this.silderInit();
    this.initFilter();
    this.productService.isSearcheHit$.subscribe((res)=>{
      if(res){
        this.isRequestFilter = true;
        this.filterPayload.title = this.productService.isSearch;
        this.loadMore();
      } else{
        this.getAdsList();
      }
    })
  }

  initFilter(): void {
    this.productService.getCategory().subscribe((res)=>{
      this.categoryArray = res;
    });
    this.userService.getCountry().subscribe((res)=>{
      this.countryArray = res;
    })
  }

  categoryCollapse(index:number): void {
      this.categoryArray[index].isCollapse = !this.categoryArray[index].isCollapse;
  }
  
  filterCollapse(type: string): void {
     if(type == 'category'){
       this.isFilterCollapse.isCategory = !this.isFilterCollapse.isCategory;
     }
     if(type == 'country'){
      this.isFilterCollapse.isCountry = !this.isFilterCollapse.isCountry;
    }
    if(type == 'city'){
      this.isFilterCollapse.isCity = !this.isFilterCollapse.isCity;
    }
    if(type == 'state'){
      this.isFilterCollapse.isState = !this.isFilterCollapse.isState;
    }
    if(type == 'type'){
      this.isFilterCollapse.isType = !this.isFilterCollapse.isType;
    }
    if(type == 'price'){
      this.isFilterCollapse.isPrice = !this.isFilterCollapse.isPrice;
    }
  }

  silderInit(): void {
    console.log(noUiSlider)
    var slider:any = document.getElementById('slider');

    noUiSlider.create(slider, {
      start: [300, 700],
      connect: true,
      range: {
        'min': 100,
        'max': 9000
      },
    });
      let value = slider.noUiSlider.get();
      this.filterPayload.min = value[0];
      this.filterPayload.max = value[1];
    slider.noUiSlider.on('change',()=>{
      value = slider.noUiSlider.get();
      this.filterPayload.min = value[0];
      this.filterPayload.max = value[1];
    })
  }
  
  onCheckboxChange(event:any): void{
    if(event.target.checked) { 
       this.filterPayload.type = event.target.value;
    } else {
      delete this.filterPayload.type;
    }
    this.isRequestFilter = true;
    this.loadMore();
  }
  onCountyChange($event){
    this.filterPayload.countryId = Number($event.target.value);
     // this.filterPayload.countryId = Number($event.value.countryId);
    this.getState();
    this.filterPayload.stateId = 0;
    this.isRequestFilter = true;
    this.loadMore();
  }
  onStateChange($event){
    this.filterPayload.stateId = Number($event.target.value);
    this.getCity();
    this.filterPayload.cityId = 0;
    this.isRequestFilter = true;
    this.loadMore();
  }
  onCityChange($event){
    this.filterPayload.cityId = Number($event.target.value);
    this.isRequestFilter = true;
    this.loadMore();
  }
  onRangeChange($event:any,type:string){
    console.log($event)
    if(type == 'min'){
      this.filterPayload.max = '';
      return;
    }
    if(type == 'max'){
      if(Number(this.filterPayload.min) >= Number(this.filterPayload.max)){
        this.filterPayload.max = '';
        this.commonService.warning('Max Price Should be greater than Min Price')
      }
      return;
    }
    if(!this.filterPayload.min || !this.filterPayload.max){
      this.commonService.warning('Max And Min Price both are required');
      return
    }
    this.isRequestFilter = true;
    if(this.filterPayload.max){
      this.filterPayload.maxPrice =  Number(this.filterPayload.max);
    }
    if(this.filterPayload.min){
      this.filterPayload.minPrice = Number(this.filterPayload.min);
    }
    this.loadMore();
  }
  onCategoryChange(id:number, type:string,parentId:number = 0){
    if(type == 'category'){
      this.filterPayload.categoryId = id;
      this.filterPayload.subCategoryId = 0;
    } else {
      this.filterPayload.categoryId = parentId;
      this.filterPayload.subCategoryId = id;
    }
    this.isRequestFilter = true;
    this.loadMore();
  }
  onSortChange($event:any){
    // let sort = $event.target.value;
    // if(sort == 'default'){
    //   let a = _.sortBy(this.adsListArray, [(o)=> { return o.featuredOn; }]);
    //   console.log(a)
    // }
    // if(sort == 'a-z'){
    //   this.adsListArray.sort(this.compare);
    // }
    // if(sort == 'z-a'){
    //   this.adsListArray.sort(this.des);
    // }
  }
  // sortData() {
  //   return this.data.sort((a, b) => {
  //     return <any>new Date(b.CREATE_TS) - <any>new Date(a.CREATE_TS);
  //   });
  // }
   compare(a, b) {
    const bandA = a.title.toUpperCase();
    const bandB = b.title.toUpperCase();
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  des(a, b) {
    const bandA = a.title.toUpperCase();
    const bandB = b.title.toUpperCase();
  
    let comparison = 0;
    if (bandA < bandB) {
      comparison = 1;
    } else if (bandA > bandB) {
      comparison = -1;
    }
    return comparison;
  }

  getAdsList(): void{
    this.productService.getAdsList(this.filterPayload)
    .subscribe((res)=>{
      if(this.isRequestFilter){
        this.adsListArray = [];
      }
      this.adsListArray = this.adsListArray.concat(res);
      this.isRequestLoadMore = false;
      this.isRequestFilter = false;
    },(error)=>{
      this.isRequestLoadMore = false;
      this.isRequestFilter = false;
      console.log(error);
    })
  }
  getState(){
    this.userService.getState(this.filterPayload.countryId).subscribe((res)=>{
      this.stateArray = res;
    })
  }
  getCity(){
    this.userService.getCity(this.filterPayload.stateId).subscribe((res)=>{
      this.cityArray = res;
    })
  }
  loadMore(){
    if(this.isRequestFilter){
      this.filterPayload.pageNumber = 1;
    } else {
      this.filterPayload.pageNumber = this.filterPayload.pageNumber + 1;
    }
    this.isRequestLoadMore = true;
    this.getAdsList();
  }
 reset(): void{
  this.isRequestFilter = true;
  this.filterPayload.maxPrice = 0;
  this.filterPayload.minPrice = 0;
  this.filterPayload.min = '';
  this.filterPayload.max = '';
  this.filterPayload.cityId = 0;
  this.filterPayload.countryId = 0;
  this.filterPayload.stateId = 0;
  this.filterPayload.categoryId = 0;
  this.filterPayload.subCategoryId = 0;
  this.selectedRadio._results.map((res,index)=>{
    this.selectedRadio._results[index].nativeElement.querySelector('.input-radio__input').checked = false;
  })
  delete this.filterPayload.type;
  this.filterPayload.title = '';
  this.productService.isSearch = '';
  this.stateArray = [];
  this.cityArray = [];
  this.getAdsList();
 }
 
 ngOnDestroy(){
  this.productService.isSearch = '';
  this.productService.isSearcheHit$.next(false);
}
}
