import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ICategory } from 'src/app/interface/category';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { IProductList, IProductListData } from 'src/app/interface/product';
import { ICountryData, IStateData, ICityData } from 'src/app/interface/user';
import { UserService } from 'src/app/shared/services/user/user.service';

declare const noUiSlider: any
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
// https://stackblitz.com/edit/angular-pagination-bkfqss?file=app%2Fpagination%2Fpagination.component.html
export class ProductListComponent implements OnInit {
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
    private userService: UserService
    ) { }

  ngOnInit() {
    // this.silderInit();
    this.initFilter();
    this.getAdsList();
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
  onRangeChange(){
    this.isRequestFilter = true;
    if(this.filterPayload.max){
      this.filterPayload.maxPrice =  Number(this.filterPayload.max);
    }
    if(this.filterPayload.min){
      this.filterPayload.minPrice = Number(this.filterPayload.min);
    }
    this.loadMore();
  }
  onCategoryChange(id:number, type:string){
    if(type == 'category'){
      this.filterPayload.categoryId = id;
    } else {
      this.filterPayload.subCategoryId = id;
    }
    this.isRequestFilter = true;
    this.loadMore();
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
  this.stateArray = [];
  this.cityArray = [];
  this.getAdsList();
 }
}
