import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductData, IProductImage } from 'src/app/interface/product';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit,OnDestroy {
  // placeholder loading animation css
  // placeholder loading angular
  // https://cloudcannon.com/deconstructions/2014/11/15/facebook-content-placeholder-deconstruction.html
  // https://stackoverflow.com/questions/35151887/how-to-create-placeholder-while-loading-like-facebook/35151954
  private unsubscribe$ = new Subject;
  isDetailAdRequest:boolean = false;
   productTab = {
     description : true,
     specification: false
   }
   selectedImage = 'assets/images/product/loading.png';
   productDetailImage:Array<IProductImage> = [
     {picture:'assets/images/product/loading.png',coverImage:true},
     {picture:'assets/images/product/loading.png',coverImage:false},
     {picture:'assets/images/product/loading.png',coverImage:false},
     {picture:'assets/images/product/loading.png',coverImage:false},
    ]
  adId: number = 0;
  userId: number = 0;
  isAuth:boolean = false;
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
    public authService: AuthService,
    private router: Router
  ) { 
    this.adId = Number(this.route.snapshot.params.id);
    this.userId = this.commonService.getUserId();
  }

  ngOnInit() {
    this.getAdsDetail();
    this.authService.isAuth$.subscribe((res)=>{
     this.isAuth = res;
    });
    this.route.params
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(routeParams => {
      this.adId = Number(routeParams.id);
      this.getAdsDetail();
    });
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
    this.isDetailAdRequest = true
    this.productService.adsDetail({productId:this.adId})
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((res)=>{
       console.log(res);
       this.isDetailAdRequest = false
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
       tags = `${tags}, ${t}`;
     } else {
      tags = `${t}`;
     }
   })
   return tags;
  }
  addFavouriteAds(){
    if(!this.isAuth){
       this.routeTo('/login');
       return;
    }
    this.productService.addFavouriteProduct({userId:this.userId,adId:this.adsDetails.adId})
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((res)=>{
      this.commonService.success('Ad has been added to Favourite List')
    })
  }
  routeTo(path:string){
    this.router.navigate([path]);
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
}
}
