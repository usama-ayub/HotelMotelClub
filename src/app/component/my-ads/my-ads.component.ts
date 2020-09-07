import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { IFavouriteProductData } from 'src/app/interface/product';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.scss']
})
export class MyAdsComponent implements OnInit {
  private userId;
  public myAds:Array<IFavouriteProductData> = [];
  pagination = {
    page:1,
    pageSize:3,
    totalPages:1
  }
  constructor(
    private productService:ProductService,
    private commonService:CommonService,
  ) { 
    this.userId = this.commonService.getUserId();
  }

  ngOnInit() {
    this.getMyAds(this.pagination);
  }

  onPageChange(event){
    this.pagination.page = event.value;
    this.getMyAds(this.pagination);
  }
  
  getMyAds(data){
    let payload = {userId:this.userId,pageNumber:data.page,pageSize:data.pageSize};
    this.productService.getMyAds(payload).subscribe((res)=>{
      this.myAds = res;
      this.pagination.totalPages = Math.round((this.myAds[0].total/this.pagination.pageSize));
    })
  }
}
