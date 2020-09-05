import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/interface/category';
import { ProductService } from 'src/app/shared/services/product/product.service';

declare const noUiSlider: any
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
// https://stackblitz.com/edit/angular-pagination-bkfqss?file=app%2Fpagination%2Fpagination.component.html
export class ProductListComponent implements OnInit {
  isRequestFilter = false;
  isRequestReset = false;
  isFilterCollapse  = {
    isCategory: true,
    isBrand: true,
    isSeller: true,
    isPrice: true
  }
  brandArray: Array<{ name: string, availabe: boolean }> = [];
  sellerArray: Array<{ name: string, availabe: boolean }> = [];
  categoryArray: Array<ICategory> = [];
  filterPayload = {
    brand: '',
    seller: [], 
    max:0,
    min:0,
    page:1,
    totalPages:20
  }
  paginationOption = {
    current:2,
    perPag:3,
    total : 10,
    next: true,
    prev: true
  }
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.silderInit();
    this.initFilter();
  }

  initFilter(): void {
    this.brandArray.push(
      { name: 'Wakita', availabe: true },
      { name: 'Zosch', availabe: true },
      { name: 'WeVALT', availabe: false },
      { name: 'Mitasia', availabe: true }
    );
    this.productService.getCategory().subscribe((res)=>{
      this.categoryArray = res;
      console.log(res)
    })
    // this.categoryArray.push(
    //   {
    //     id: '1', name: 'Hotel Jobs', description: 'Hotel Jobs',
    //     isCollapse:false,
    //     child: [
    //       { id: '1.1', name: 'Management', description: 'Management', child: [] },
    //       { id: '1.2', name: 'Front Desk', description: 'Front Desk', child: [] },
    //       { id: '1.2', name: 'House Keeper', description: 'House Keeper', child: [] },
    //       { id: '1.2', name: 'Maintenance', description: 'Maintenance', child: [] },
    //     ]
    //   },
    //   {
    //     id: '2', name: 'Housekeeping Supplies', description: 'Housekeeping Supplies',
    //     isCollapse:false,
    //     child: [
    //       { id: '1.1', name: 'Chemicals', description: 'Chemicals', child: [] },
    //       { id: '1.2', name: 'Linnen', description: 'Linnen', child: [] },
    //       { id: '1.2', name: 'Misc', description: 'Misc', child: [] }
    //     ]
    //   },
    //   {
    //     id: '3', name: 'Real Estate', description: 'Real Estate',
    //     isCollapse:false,
    //     child: [
    //       { id: '1.1', name: 'For Sale', description: 'For Sale', child: [] },
    //       { id: '1.2', name: 'For Rent', description: 'For Rent', child: [] },
    //       { id: '1.2', name: 'Others', description: 'Others', child: [] }
    //     ]
    //   },
    //   {
    //     id: '4', name: 'Misc', description: 'Misc',
    //     isCollapse:false,
    //     child: []
    //   },
    //   {
    //     id: '5', name: 'Events & Announcements', description: 'Events & Announcements',
    //     isCollapse:false,
    //     child: []
    //   },
    //   {
    //     id: '6', name: 'Guest Supplies', description: 'Guest Supplies',
    //     isCollapse:false,
    //     child: []
    //   },
    //   {
    //     id: '7', name: 'Hotel Furniture', description: 'Guest Supplies',
    //     isCollapse:false,
    //     child: []
    //   }
    // );
    this.sellerArray.push(
      { name: 'Wakita', availabe: true },
      { name: 'Zosch', availabe: true },
      { name: 'WeVALT', availabe: false },
      { name: 'Mitasia', availabe: true }
    )
  }

  categoryCollapse(index:number): void {
      this.categoryArray[index].isCollapse = !this.categoryArray[index].isCollapse;
  }
  
  filterCollapse(type: string): void {
     if(type == 'category'){
       this.isFilterCollapse.isCategory = !this.isFilterCollapse.isCategory;
     }
     if(type == 'brand'){
      this.isFilterCollapse.isBrand = !this.isFilterCollapse.isBrand;
    }
    if(type == 'seller'){
      this.isFilterCollapse.isSeller = !this.isFilterCollapse.isSeller;
    }
    if(type == 'price'){
      this.isFilterCollapse.isPrice = !this.isFilterCollapse.isPrice;
    }
  }

  silderInit(): void {
    console.log(noUiSlider)
    var slider:any = document.getElementById('slider');

    noUiSlider.create(slider, {
      start: [300, 700],
      connect: true,
      range: {
        'min': 100,
        'max': 1000
      },
    });
      let value = slider.noUiSlider.get();
      this.filterPayload.min = value[0];
      this.filterPayload.max = value[1];
    slider.noUiSlider.on('change',()=>{
      value = slider.noUiSlider.get();
      this.filterPayload.min = value[0];
      this.filterPayload.max = value[1];
    })
  }
  
  onCheckboxChange(event:any): void{
    if(event.target.checked) { 
       this.filterPayload.seller.push(event.target.value);
    } else {
      this.filterPayload.seller.splice(event.target.value,1);
    }
  }

  applyFiler(): void {
    this.isRequestFilter = true;
    console.log(this.filterPayload);
    setTimeout(()=>{
      this.isRequestFilter = false;
    },1000)
  }

  onPageChange(event: any) {
    this.filterPayload.page = event.value;
  }

}
