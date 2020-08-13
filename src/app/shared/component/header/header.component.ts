import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAccountDropdown:boolean = false;
  isLanguageDropdown:boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  showAccountDropdown(){
    this.isLanguageDropdown = false;
    this.isAccountDropdown = !this.isAccountDropdown
  }
  showLanguageDropdown(){
    this.isAccountDropdown = false
    this.isLanguageDropdown = !this.isLanguageDropdown
  }
  routeTo(path:string){
    this.router.navigate([path]);
  }
}
