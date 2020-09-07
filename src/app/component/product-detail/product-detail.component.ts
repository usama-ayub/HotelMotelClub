import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { IProductData, IProductImage } from 'src/app/interface/product';

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
   productDetailImage:Array<IProductImage> = [
     {picture:'assets/images/product/product-1.jpg',coverImage:true},
     {picture:'assets/images/product/product-2.jpg',coverImage:false},
     {picture:'assets/images/product/product-3.jpg',coverImage:false},
     {picture:'assets/images/product/product-4.jpg',coverImage:false},
    ]
  adId: number = 0
  adsDetails:IProductData = {
    title:'',
    description:'',
    type:'',
    tags:[],
    addressLine1:'',
    addressLine2:'',
    addressLine3:'',
    city:'',
    country:'',
    contact:'',
    stateId:0,
    price:0,
    userId:0,
    adId:0,
    subCategoryId:0,
    images:[]
  }
  constructor(
    private route: ActivatedRoute,
    private productService:ProductService,
    private commonService:CommonService,
  ) { 
    this.adId = Number(this.route.snapshot.params.id);
  }

  ngOnInit() {
    this.getAdsDetail();
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
  onImageSelect(image:string, index: number){
    this.productDetailImage.map((res)=>{
      res.coverImage = false;
    })
    this.productDetailImage[index].coverImage = true;
    this.selectedImage = image;
  }
  getAdsDetail(): void{
    this.productService.adsDetail({userId:this.commonService.getUserId(),adId:this.adId}).subscribe((res)=>{
       console.log(res);
       this.adsDetails = res;
       this.productDetailImage = this.adsDetails.images;
       this.selectedImage = this.productDetailImage.find((pic)=>{
         return pic.coverImage == true;
       }).picture;
    });
  }

  getCommaTag(): string{
   let tags = '';
   this.adsDetails.tags.map((t)=>{
     if(tags){
       tags = `${tags},${t}`;
     } else {
      tags = `${t}`;
     }
   })
   return tags;
  }
}
