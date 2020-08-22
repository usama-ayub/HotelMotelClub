import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.scss']
})
export class MyAdsComponent implements OnInit {
  pagination = {
    page:1,
    totalPages:5
  }
  constructor() { }

  ngOnInit() {
  }

  onPageChange(e){

  }
  
}
