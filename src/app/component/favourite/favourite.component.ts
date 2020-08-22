import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
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
