import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  settingTab = {
    description : true,
    specification: false
  }
  constructor() { }

  ngOnInit() {
  }

  onTabChange(type:string): void{
    if(type == 'desc'){
      this.settingTab.description = true;
      this.settingTab.specification = false;
    }
    if(type == 'speci'){
      this.settingTab.specification = true;
     this.settingTab.description = false;
   }
   }

}
