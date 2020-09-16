import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ProductService } from '../../services/product/product.service';
import { CommonService } from '../../services/common/common.service';
import { IFavouriteProductData, IProductListData } from 'src/app/interface/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth:boolean = false;
  isWishListDropdown:boolean = false;
  isSearchDropdown:boolean = false;
  isSearchMobileDropdown:boolean = false;
  isMenuShow:boolean = false;
  navMenu :Array<{name:string, path:string, child:Array<any>, isCollapse:boolean}> =[];
  authGarudPath = ['/create-product', '/ads', '/favourite', '/setting'];
  userId:number;
  favProduct:Array<IFavouriteProductData> = [];
  totalFavProduct :number = 0;
  searchAdsTitle:string = '';
  adsListArray:Array<IProductListData> = [];
  constructor(
    private router: Router,
    public authService: AuthService,
    public productService: ProductService,
    private commonService: CommonService
  ) { 
    this.userId = this.commonService.getUserId();
  }

  ngOnInit() {
    this.initNav();
    this.authService.isAuth$.subscribe((res:boolean)=>{
      console.log(res);
      this.isAuth = res;
      if(!this.isAuth){
        this.navMenu[1].child = [];
        this.navMenu[1].child.push({name:'Login', path:'/login'});
        this.navMenu[1].child.push({name:'Register', path:'/register'});
      } else {
        this.getFavouriteProduct();
        this.navMenu[1].child = [];
        this.navMenu[1].child.push({name:'Create Ad', path:'/create-product'});
        this.navMenu[1].child.push({name:'My Ads', path:'/ads'});
        this.navMenu[1].child.push({name:'Favourite', path:'/favourite'});
        this.navMenu[1].child.push({name:'Setting', path:'/setting'});
        this.navMenu[1].child.push({name:'logout', path:'/logout'});
      }
    })
    this.productService.isFavouriteHit$.subscribe((res)=>{
      if(res){
        this.getFavouriteProduct();
      }
    });
  }
 
  getFavouriteProduct(){
    this.productService.getFavouriteProduct({userId:this.userId,pageNumber:1,pageSize:3})
        .subscribe((res)=>{
           this.favProduct = res;
           this.totalFavProduct = this.favProduct.length == 0 ? 0 : this.favProduct[0].total;
        })
  }
  initNav():void {
    this.navMenu.push(
      {name:'Home', path:'/home', child:[],isCollapse:false},
      {name:'My Account', path:'',child:[],isCollapse:false},
      {name:'About Us', path:'/about',child:[],isCollapse:false},
      {name:'Contact Us', path:'/contact',child:[],isCollapse:false},
      {name:'FAQ', path:'/faq',child:[],isCollapse:false},
      {name:'Policies', path:'/policy', child:[],isCollapse:false},
      )
  }

  showWishList(device:string='desktop'): void{
    if(!this.isAuth){
      this.routeTo('/login');
      return;
    }
    if(device == 'mobile'){
      this.routeTo('/favourite');
    } else {
      this.isWishListDropdown = !this.isWishListDropdown;
    }
  }

  wishListOutSideClick(event:any): void{
    this.isWishListDropdown = false;
  }
  searchOutSideClick(event:any): void{
    this.isSearchDropdown = false;
  }
  
  logout() :void{
    this.authService.logout().subscribe((res:boolean)=>{
      // if(this.authGarudPath.includes(this.router.url)){
      //    this.routeTo('/login')
      // }
    })
  }

  onClickSearch() :void{
    this.productService.isSearcheHit$.next(true);
    this.routeTo('/home');
    // this.productService.getAdsList({pageNumber:1,title:this.searchAdsTitle})
    // .subscribe((res)=>{
    //   console.log(res);
    //   this.adsListArray = res;
    //   if(this.adsListArray.length !== 0){
    //     this.isWishListDropdown = false;
    //     this.isSearchDropdown = !this.isSearchDropdown;
    //   }
    // })
    
  }

  routeTo(path:string, params:number = 0) :void{
    this.isSearchDropdown = false;
    if(path){
      if(path == '/logout'){
        this.logout();
      } else {
        if(params){
          this.router.navigate([path,params]);
        } else {
          this.router.navigate([path]);
        }
        this.isMenuShow = false;
      }
    }
  }

  // For Mobile

  onClickMenu(){
    this.isMenuShow = !this.isMenuShow
  }

  childMenuCollapse(index:number):void {
   this.navMenu[index].isCollapse = !this.navMenu[index].isCollapse;
  }
  showMobileSearchBar(){
     this.isSearchMobileDropdown = !this.isSearchMobileDropdown
  }
}
