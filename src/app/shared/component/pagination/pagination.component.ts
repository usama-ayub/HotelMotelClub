import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input('page') page: number;
  totalPages: number;
  prePage = 3;
  arrayPages: number[];
  @Output() onPageChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  listaPaginas() {
    this.arrayPages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.arrayPages.push(i);
    }
  }

  @Input('totalPages')
  set updateTotalPagesValue(totalPages: number) {
    this.totalPages = totalPages;
    this.listaPaginas();
  }

  currentPage(pag: number) {
    this.onPageChange.emit({value: pag});
  }

  next() {
    if (this.page < this.totalPages) {
      this.currentPage(this.page + 1);
    }
  }

  Previous() {
    if (this.page > 1) {
      this.currentPage(this.page - 1);
    }
  }

  diminuiPaginacao(pags) {
    const metadePgs = Math.ceil(this.prePage / 2);
    let i = this.page - metadePgs;
    if (i < 0) {
      i = 0;
    }
    let f = i + this.prePage;
    if (f > pags.length) {
      f = pags.length;
      i = f - this.prePage;
      if (i < 0) {
        i = 0;
      }
    }
    return pags.slice(i, f);
  }

}
