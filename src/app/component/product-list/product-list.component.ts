import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/interface/category';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { IProductList, IProductListData } from 'src/app/interface/product';

declare const noUiSlider: any
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
// https://stackblitz.com/edit/angular-pagination-bkfqss?file=app%2Fpagination%2Fpagination.component.html
export class ProductListComponent implements OnInit {
  isRequestFilter = false;
  isRequestReset = false;
  isRequestLoadMore = false;
  isFilterCollapse  = {
    isCategory: true,
    isBrand: true,
    isSeller: true,
    isPrice: true
  }
  brandArray: Array<{ name: string, availabe: boolean }> = [];
  sellerArray: Array<{ name: string, availabe: boolean }> = [];
  categoryArray: Array<ICategory> = [];
  filterPayload:IProductList = {
    pageNumber:1,
    maxPrice:0,
    min:'',
    max:'',
    minPrice:0,
  }
  adsListArray:Array<IProductListData> = [];
  // filterPayload = {
  //   brand: '',
  //   seller: [], 
  //   max:0,
  //   min:0,
  //   page:1,
  //   totalPages:20
  // }
  paginationOption = {
    current:2,
    perPag:3,
    total : 10,
    next: true,
    prev: true
  }
  constructor(private productService:ProductService) { }

  ngOnInit() {
    // this.silderInit();
    this.initFilter();
    this.getAdsList();
  }

  initFilter(): void {
    this.brandArray.push(
      { name: 'Wakita', availabe: true },
      { name: 'Zosch', availabe: true },
      { name: 'WeVALT', availabe: false },
      { name: 'Mitasia', availabe: true }
    );
    this.productService.getCategory().subscribe((res)=>{
      this.categoryArray = res;
    })
    this.sellerArray.push(
      { name: 'Wakita', availabe: true },
      { name: 'Zosch', availabe: true },
      { name: 'WeVALT', availabe: false },
      { name: 'Mitasia', availabe: true }
    )
  }

  categoryCollapse(index:number): void {
      this.categoryArray[index].isCollapse = !this.categoryArray[index].isCollapse;
  }
  
  filterCollapse(type: string): void {
     if(type == 'category'){
       this.isFilterCollapse.isCategory = !this.isFilterCollapse.isCategory;
     }
     if(type == 'brand'){
      this.isFilterCollapse.isBrand = !this.isFilterCollapse.isBrand;
    }
    if(type == 'seller'){
      this.isFilterCollapse.isSeller = !this.isFilterCollapse.isSeller;
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
      //  this.filterPayload.seller.push(event.target.value);
    } else {
      // this.filterPayload.seller.splice(event.target.value,1);
    }
  }

  // applyFiler(): void {
  //   this.isRequestFilter = true;
  //   if(this.filterPayload.max){
  //     this.filterPayload.maxPrice =  Number(this.filterPayload.max);
  //   }
  //   if(this.filterPayload.min){
  //     this.filterPayload.minPrice = Number(this.filterPayload.min);
  //   }
  //   this.getAdsList();
  // }
  onRangeChange(e){
    this.isRequestFilter = true;
  }
  getAdsList(): void{
    if(this.filterPayload.max){
      this.filterPayload.maxPrice =  Number(this.filterPayload.max);
    }
    if(this.filterPayload.min){
      this.filterPayload.minPrice = Number(this.filterPayload.min);
    }
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
  this.getAdsList();
 }
}
