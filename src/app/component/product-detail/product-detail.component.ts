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
}
