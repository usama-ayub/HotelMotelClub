import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-term-condition',
  templateUrl: './term-condition.component.html',
  styleUrls: ['./term-condition.component.scss']
})
export class TermConditionComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  routeTo(path:string){
    this.router.navigate([path]);
  }

}
