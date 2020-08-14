import { Component, OnInit } from '@angular/core';

declare const noUiSlider: any
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.silderInit();
  }

  silderInit(): void {
    console.log(noUiSlider)
    var slider = document.getElementById('slider');

    noUiSlider.create(slider, {
      start: [300, 700],
      connect: true,
      range: {
        'min': 100,
        'max': 1000
      }
    });
  }

}
