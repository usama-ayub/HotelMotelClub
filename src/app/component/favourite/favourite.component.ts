import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { IFavouriteProduct, IFavouriteProductData } from 'src/app/interface/product';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  private userId;
  pagination = {
    page:1,
    pageSize:3,
    totalPages:1
  }
  isRemoveFavorite:boolean = false;
  public favProduct:Array<IFavouriteProductData> = [];
  constructor(
    private productService: ProductService,
    private commonService: CommonService,
  ) { 
    this.userId = this.commonService.getUserId();
  }

  ngOnInit(): void{
    this.getFavouriteProduct(this.pagination);
    // this.productService.addFavouriteProduct({userId:this.userId,adId:21}).subscribe((res)=>{})
  }
  onPageChange(event){
    this.pagination.page = event.value;
    this.getFavouriteProduct(this.pagination);
  }

  getFavouriteProduct(data): void{
    let payload = {userId:this.userId,pageNumber:data.page,pageSize:data.pageSize};
    this.productService.getFavouriteProduct(payload).subscribe((res)=>{
      this.favProduct = res;
      this.pagination.totalPages = Math.round((this.favProduct[0].total/this.pagination.pageSize));
    }, (error)=>{
      console.log(error);
    })
  }
  removeFavouriteProduct($event){
    if(this.isRemoveFavorite) return;
    let payload:IFavouriteProduct = {userId:this.userId,adId:$event};
    this.isRemoveFavorite = true;
    this.productService.removeFavouriteProduct(payload).subscribe((res)=>{
      this.commonService.success('Ad has been removed from Favourite List');
      this.isRemoveFavorite = false;
      this.getFavouriteProduct(this.pagination);
    }, (error)=>{
      this.isRemoveFavorite = false;
      console.log(error);
    })
  }

}
