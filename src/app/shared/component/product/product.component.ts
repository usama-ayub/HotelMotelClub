import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProductListData } from 'src/app/interface/product';
import { CommonService } from '../../services/common/common.service';
import { AuthService } from '../../services/auth/auth.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() index: number;
  @Input() item: IProductListData;
  userId: number = 0;
  userVerify: boolean = false;
  isAuth:boolean = false;
  constructor(
    private router: Router,
    private productService:ProductService,
    private commonService:CommonService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isAuth$.subscribe((res)=>{
      this.isAuth = res;
     });
     this.userId = this.commonService.getUserId();
     this.userVerify = this.commonService.getUserVerify();
  }

  addFavouriteAds(adId:number){
    if(!this.isAuth){
       this.routeTo('/login');
       return;
    }
    if(!this.userVerify){
      this.commonService.warning('Please Verify Your Account');
      return;
    }
    this.productService.addFavouriteProduct({userId:this.userId,adId:adId})
    .subscribe((res)=>{
      this.commonService.success('Ad has been added to Favourite List')
    })
  }

  routeTo(path:string, params:number = 0){
    if(!params){
      this.router.navigate([path]);
    } else {
      this.router.navigate([path,params]);
    }
  }

}
