import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IFavouriteProductData } from 'src/app/interface/product';

@Component({
  selector: 'app-product-alt',
  templateUrl: './product-alt.component.html',
  styleUrls: ['./product-alt.component.scss']
})
export class ProductAltComponent implements OnInit {

  @Input() listType: string = 'ads';
  @Input() product: Array<IFavouriteProductData> = [];
  @Output() removeFavProductChange = new EventEmitter();
  @Output() removeProductChange = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  routeTo(path:string, params:any){
    this.router.navigate([path,params]);
  }

  removeProduct(id:number,index:number) {
    if(this.listType == 'ads'){
      this.removeProductChange.emit(id);
    } else {
      this.removeFavProductChange.emit({id:id,index:index});
    }
  } 

}
