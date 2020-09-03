import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

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

  ngOnInit() {
    this.getFavouriteProduct(this.pagination);
  }
  onPageChange(e){

  }

  getFavouriteProduct(data){
    let payload = {userId:data.userId,pageNumber:data.page,pageSize:data.pageSize};
    this.productService.getFavouriteProduct(payload).subscribe((res)=>{
      this.favProduct = res;
      console.log(res);
    })
  }
}
