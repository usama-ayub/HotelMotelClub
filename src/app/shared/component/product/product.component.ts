import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProductListData } from 'src/app/interface/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() index: number;
  @Input() item: IProductListData;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  routeTo(path:string, params:any){
    this.router.navigate([path,params]);
  }

}
