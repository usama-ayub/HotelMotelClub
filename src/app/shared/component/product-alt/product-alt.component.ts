import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-alt',
  templateUrl: './product-alt.component.html',
  styleUrls: ['./product-alt.component.scss']
})
export class ProductAltComponent implements OnInit {

  @Input() listType: string = 'ads';
  @Input() product: Array<any> = [];
  @Output() removeProductChange = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  routeTo(path:string, params:any){
    this.router.navigate([path,params]);
  }

  removeProduct(id:number) {
    this.removeProductChange.emit(id);
  } 

}
