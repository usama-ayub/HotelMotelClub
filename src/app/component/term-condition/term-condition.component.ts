import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPolicyData } from 'src/app/interface/common';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-term-condition',
  templateUrl: './term-condition.component.html',
  styleUrls: ['./term-condition.component.scss']
})
export class TermConditionComponent implements OnInit {
  policy:IPolicyData = {policy:'',active:true,createdOn:'',id:0};
  constructor(
    private router: Router,
    public commonService:CommonService
  ) { }

  ngOnInit() {
    this.getPolicy();
  }
  
  getPolicy(){
    this.commonService.getPolicy().subscribe((res)=>{
      this.policy = res[0];
    })
  }
  routeTo(path:string){
    this.router.navigate([path]);
  }

}
