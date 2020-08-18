import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() pageTitle: string;
  @Input() numberOfPath: number = 0;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  routeTo(path:string){
    this.router.navigate([path]);
  }
}
