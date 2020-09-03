import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { IFavouriteProduct } from 'src/app/interface/product';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  private userId;
  pagination = {
    page:1,
    totalPages:1,
    pageSize:10,
    userId:this.userId
  }
  public favProduct:Array<any> = [];
  constructor(
    private productService: ProductService,
    private commonService: CommonService,
  ) { 
    this.userId = this.commonService.getUserId();
  }

  ngOnInit(): void{
    this.getFavouriteProduct(this.pagination);
  }
  onPageChange(event){
    // this.pagination.page = event.value;
    // this.getFavouriteProduct(this.pagination);
  }

  getFavouriteProduct(data): void{
    let payload = {userId:data.userId,pageNumber:data.page,pageSize:data.pageSize};
    this.productService.getFavouriteProduct(payload).subscribe((res)=>{
      this.favProduct = res;
      console.log(res);
    })
  }

  removeFavouriteProduct(productId:number): void{
    let payload:IFavouriteProduct = {userId:this.userId,adId:productId};
    this.productService.removeFavouriteProduct(payload).subscribe((res)=>{
      console.log(res);
      this.getFavouriteProduct(this.pagination);
    })
  }

}
