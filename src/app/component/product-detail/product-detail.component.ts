import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
   productTab = {
     description : true,
     specification: false
   }
   selectedImage = 'assets/images/product/product-1.jpg';
   productDetailImage = [
     {path:'assets/images/product/product-1.jpg',active:true},
     {path:'assets/images/product/product-2.jpg',active:false},
     {path:'assets/images/product/product-3.jpg',active:false},
     {path:'assets/images/product/product-4.jpg',active:false},
    ]
  constructor() { }

  ngOnInit() {
  }

  onTabChange(type:string): void{
   if(type == 'desc'){
     this.productTab.description = true;
     this.productTab.specification = false;
   }
   if(type == 'speci'){
     this.productTab.specification = true;
    this.productTab.description = false;
  }
  }
  onImageSelect(path:string, index: number){
    this.productDetailImage.map((res)=>{
      res.active = false;
    })
    this.productDetailImage[index].active = true;
    this.selectedImage = path;
  }
}
