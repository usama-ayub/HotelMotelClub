import { Component, OnInit } from '@angular/core';
import { IFAQData } from 'src/app/interface/common';
import { CommonService } from 'src/app/shared/services/common/common.service';
import {chunk} from 'lodash';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqArray:Array<Array<IFAQData>> = [];
  constructor(public commonService:CommonService) { }

  ngOnInit() {
    this.getFaq();
  }

  getFaq(){
    this.commonService.getFAQ().subscribe((res)=>{
        this.faqArray = chunk(res,2);
    })
  }
}
